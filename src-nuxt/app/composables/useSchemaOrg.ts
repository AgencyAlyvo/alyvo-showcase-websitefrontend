/**
 * Entrée Schema.org à injecter dans la page.
 */
interface SchemaOrgInput {
  type: 'WebSite' | 'WebPage' | 'Article' | 'Organization' | 'CreativeWork'
  data: Record<string, unknown>
}

/**
 * Injecte une ou plusieurs entrées Schema.org sous forme de scripts JSON-LD.
 * @param {SchemaOrgInput | SchemaOrgInput[]} entries - Entrée(s) Schema.org à injecter.
 */
export function useSchemaOrg(entries: SchemaOrgInput | SchemaOrgInput[]): void {
  const list: SchemaOrgInput[] = Array.isArray(entries) ? entries : [entries]

  useHead({
    script: list.map((entry: SchemaOrgInput) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': entry.type,
        ...entry.data,
      }),
    })),
  })
}
