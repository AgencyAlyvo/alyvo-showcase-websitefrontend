const TOKEN_REQUEST_TIMEOUT_MS: number = 10_000

export const GSC_SCOPE: string = 'https://www.googleapis.com/auth/webmasters.readonly'

/**
 * Google Search Console API: get access token from refresh token.
 * @param {string} clientId - Identifiant OAuth Google.
 * @param {string} clientSecret - Secret OAuth Google.
 * @param {string} refreshToken - Refresh token OAuth Google.
 * @returns {Promise<string>} Access token utilisable pour l'API GSC.
 */
export async function getAccessTokenFromRefreshToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string,
): Promise<string> {
  const controller: AbortController = new AbortController()
  const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => controller.abort(), TOKEN_REQUEST_TIMEOUT_MS)
  let res: Response
  try {
    res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeoutId)
  }
  if (!res.ok) {
    const err: string = await res.text()
    throw new Error(`Google token refresh failed: ${res.status} ${err}`)
  }
  const data: { access_token?: string } = (await res.json()) as { access_token?: string }
  if (!data.access_token) {
    throw new Error('Google token response missing access_token')
  }
  return data.access_token
}

/**
 *
 */
type ServiceAccountKey = {
  client_email?: string
  private_key?: string
}

/**
 * Access token via Service Account (JWT). Priorité si GSC_SERVICE_ACCOUNT_JSON est défini.
 * @param {string} serviceAccountJson - JSON brut du Service Account Google.
 * @returns {Promise<string>} Access token signÃ© via JWT.
 */
export async function getAccessTokenFromServiceAccount(serviceAccountJson: string): Promise<string> {
  let key: ServiceAccountKey
  try {
    key = JSON.parse(serviceAccountJson) as ServiceAccountKey
  } catch {
    throw new Error('GSC_SERVICE_ACCOUNT_JSON is invalid JSON')
  }
  if (!key.client_email || !key.private_key) {
    throw new Error('GSC_SERVICE_ACCOUNT_JSON must contain client_email and private_key')
  }
  const { JWT } = await import('google-auth-library')
  const client: InstanceType<typeof JWT> = new JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: [GSC_SCOPE],
  })
  const credentials: { access_token?: string | null } = await client.authorize()
  if (!credentials.access_token) {
    throw new Error('Service account authorization did not return access_token')
  }
  return credentials.access_token
}

/**
 *
 */
type GscAuthConfig = {
  gscServiceAccountJson?: string
  googleClientId?: string
  googleClientSecret?: string
  gscRefreshToken?: string
}

/**
 * Retourne un access token pour l'API Search Console.
 * Priorité : Service Account puis refresh token (OAuth).
 * @param {GscAuthConfig} config - ParamÃ¨tres de connexion GSC.
 * @returns {Promise<string>} Access token pour les appels Search Console.
 */
export async function getGscAccessToken(config: GscAuthConfig): Promise<string> {
  if (config.gscServiceAccountJson?.trim()) {
    return getAccessTokenFromServiceAccount(config.gscServiceAccountJson.trim())
  }
  if (config.gscRefreshToken && config.googleClientId && config.googleClientSecret) {
    return getAccessTokenFromRefreshToken(config.googleClientId, config.googleClientSecret, config.gscRefreshToken)
  }
  throw new Error(
    'Configure either GSC_SERVICE_ACCOUNT_JSON (Service Account) or GSC_REFRESH_TOKEN + GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET',
  )
}
