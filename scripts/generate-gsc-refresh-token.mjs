import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'
import { exec } from 'node:child_process'

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly'
const DEFAULT_REDIRECT_URI = 'http://localhost:8787/oauth2callback'
const ENV_FILE = 'src-nuxt/.env.development'

/**
 * Read the local development env file without requiring dotenv.
 * @returns {Record<string, string>} Parsed env values.
 */
function readLocalEnv() {
  try {
    return Object.fromEntries(
      readFileSync(ENV_FILE, 'utf8')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#') && line.includes('='))
        .map((line) => {
          const index = line.indexOf('=')
          return [line.slice(0, index), line.slice(index + 1)]
        }),
    )
  } catch {
    return {}
  }
}

/**
 * Open the OAuth authorization URL in the system browser.
 * @param {string} url - Google OAuth authorization URL.
 * @returns {void}
 */
function openBrowser(url) {
  const command =
    process.platform === 'win32'
      ? `start "" "${url}"`
      : process.platform === 'darwin'
        ? `open "${url}"`
        : `xdg-open "${url}"`
  exec(command)
}

const localEnv = readLocalEnv()
const clientId = process.env.GOOGLE_CLIENT_ID || localEnv.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || localEnv.GOOGLE_CLIENT_SECRET
const redirectUri = process.env.GOOGLE_REDIRECT_URI || DEFAULT_REDIRECT_URI

if (!clientId || !clientSecret) {
  console.error(`Ajoute GOOGLE_CLIENT_ID et GOOGLE_CLIENT_SECRET dans ${ENV_FILE}, puis relance ce script.`)
  process.exit(1)
}

const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
authUrl.search = new URLSearchParams({
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: 'code',
  scope: SCOPE,
  access_type: 'offline',
  prompt: 'consent',
}).toString()

const server = createServer(async (req, res) => {
  const callbackUrl = new URL(req.url || '/', redirectUri)
  const code = callbackUrl.searchParams.get('code')
  const error = callbackUrl.searchParams.get('error')

  if (error) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end(`Google OAuth error: ${error}`)
    console.error(`Google OAuth error: ${error}`)
    server.close()
    return
  }

  if (!code) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('OAuth callback attendu sur /oauth2callback.')
    return
  }

  try {
    const tokenResponse = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    const tokenBody = await tokenResponse.json()

    if (!tokenResponse.ok || !tokenBody.refresh_token) {
      throw new Error(JSON.stringify(tokenBody, null, 2))
    }

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Refresh token genere. Tu peux fermer cette page et revenir au terminal.')

    console.log('\nAjoute cette ligne dans src-nuxt/.env.development :\n')
    console.log(`GSC_REFRESH_TOKEN=${tokenBody.refresh_token}`)
    console.log('\nPuis redemarre Nuxt.\n')
  } catch (exchangeError) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end("Erreur pendant l'echange OAuth. Regarde le terminal.")
    console.error(exchangeError)
  } finally {
    server.close()
  }
})

server.listen(new URL(redirectUri).port, () => {
  console.log(`Serveur OAuth local pret: ${redirectUri}`)
  console.log('Ouverture de Google...')
  openBrowser(authUrl.toString())
  console.log(`\nSi le navigateur ne s'ouvre pas, copie cette URL :\n${authUrl.toString()}\n`)
})
