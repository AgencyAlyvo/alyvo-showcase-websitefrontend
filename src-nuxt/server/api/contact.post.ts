import type { H3Event } from 'h3'

/**
 * Charge utile attendue pour le formulaire de contact.
 */
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

const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event: H3Event) => {
  const body: ContactPayload = await readBody<ContactPayload>(event)

  if (!body.name.trim() || !body.email.trim() || !body.message.trim()) {
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
