interface ContactPayload {
  name: string
  email: string
  company?: string
  need?: string
  stage?: string
  budget?: string
  message: string
  locale?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactPayload>(event)

  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid payload' })
  }

  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    throw createError({ statusCode: 422, statusMessage: 'Missing required fields' })
  }

  if (!emailPattern.test(body.email.trim())) {
    throw createError({ statusCode: 422, statusMessage: 'Invalid email' })
  }

  // Branchez ici votre service d'envoi (Resend, SendGrid, Postmark, webhook, DB...).
  // Pour l'instant, on log et on retourne un accusé de réception simple.
  console.info('[contact] new request', {
    locale: body.locale,
    need: body.need,
    stage: body.stage,
    budget: body.budget,
  })

  return {
    success: true,
    receivedAt: new Date().toISOString(),
  }
})
