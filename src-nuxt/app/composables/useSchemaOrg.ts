interface SchemaOrgInput {
  type: 'WebSite' | 'WebPage' | 'Article' | 'Organization' | 'CreativeWork'
  data: Record<string, unknown>
}

export function useSchemaOrg(entries: SchemaOrgInput | SchemaOrgInput[]) {
  const list = Array.isArray(entries) ? entries : [entries]

  useHead({
    script: list.map((entry) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': entry.type,
        ...entry.data,
      }),
    })),
  })
}
