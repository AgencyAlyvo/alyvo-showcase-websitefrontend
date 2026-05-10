import type { H3Event } from 'h3'
import { createError, setCookie, readBody } from 'h3'
import { DASHBOARD_SESSION_COOKIE_NAME } from '~~/server/utils/dashboardAuth'

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

type LoginRequestBody = {
  password: string
}

/**
 * POST /api/auth/login
 * Compare le mot de passe fourni avec DASHBOARD_PASSWORD et pose un cookie de session.
 */
export default defineEventHandler(async (event: H3Event): Promise<{ ok: true }> => {
  const config = useRuntimeConfig(event)
  const expectedPassword: string = String(config.dashboardPassword ?? '')
  const sessionToken: string = String(config.dashboardSessionToken ?? '')

  if (!expectedPassword || !sessionToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Dashboard auth is not configured.',
    })
  }

  const body = await readBody<LoginRequestBody>(event)

  if (!body || typeof body.password !== 'string' || body.password.trim() === '') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password is required.',
    })
  }

  if (body.password !== expectedPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid password.',
    })
  }

  setCookie(event, DASHBOARD_SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  })

  return { ok: true }
})
