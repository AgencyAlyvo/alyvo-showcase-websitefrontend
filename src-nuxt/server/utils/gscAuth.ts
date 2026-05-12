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
 * Build the Google OAuth 2.0 authorization URL for Search Console readonly.
 * @param {string} clientId - Identifiant OAuth Google.
 * @param {string} redirectUri - URI de redirection autorisee dans Google Cloud.
 * @returns {string} URL d'autorisation Google.
 */
export function getGoogleAuthUrl(clientId: string, redirectUri: string): string {
  const params: URLSearchParams = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: GSC_SCOPE,
    access_type: 'offline',
    prompt: 'consent',
  })
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}

/**
 *
 */
type GscAuthConfig = {
  googleClientId?: string
  googleClientSecret?: string
  gscRefreshToken?: string
}

/**
 * Retourne un access token pour l'API Search Console via OAuth proprietaire.
 * @param {GscAuthConfig} config - Parametres de connexion GSC.
 * @returns {Promise<string>} Access token pour les appels Search Console.
 */
export async function getGscAccessToken(config: GscAuthConfig): Promise<string> {
  if (config.gscRefreshToken && config.googleClientId && config.googleClientSecret) {
    return getAccessTokenFromRefreshToken(config.googleClientId, config.googleClientSecret, config.gscRefreshToken)
  }
  throw new Error('Configure GSC_REFRESH_TOKEN + GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET')
}
