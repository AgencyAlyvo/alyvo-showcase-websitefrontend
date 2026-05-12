import frProjects from '~/data/projects/fr.json'
import enProjects from '~/data/projects/en.json'
import esProjects from '~/data/projects/es.json'

/**
 * Locale code supported by the sitemap output.
 */
type LocaleCode = 'fr' | 'en' | 'es'

/**
 * Per-locale URL templates for the static pages.
 */
type LocalePaths = {
  prefix: string
  home: string
  projects: string
  contact: string
}

/**
 * Hreflang alternative entry for a sitemap page.
 */
type HreflangAlternative = {
  hreflang: string
  href: string
}

/**
 * Sitemap entry for a page, including the hreflang alternatives.
 */
type SitemapEntry = {
  loc: string
  _i18nTransform: false
  alternatives: HreflangAlternative[]
}

const localePathConfig: Record<LocaleCode, LocalePaths> = {
  fr: { prefix: '', home: '/', projects: '/projets', contact: '/contact' },
  en: { prefix: '/en', home: '/en', projects: '/projects', contact: '/contact' },
  es: { prefix: '/es', home: '/es', projects: '/proyectos', contact: '/contacto' },
}

const projectsByLocale: Record<LocaleCode, { slug: string }[]> = {
  fr: frProjects as { slug: string }[],
  en: enProjects as { slug: string }[],
  es: esProjects as { slug: string }[],
}

const localeCodes: LocaleCode[] = ['fr', 'en', 'es']

/**
 * Build the localised path for the home page.
 * @param {LocaleCode} locale - Target locale code.
 * @returns {string} Absolute path on the public site.
 */
function homeUrl(locale: LocaleCode): string {
  return localePathConfig[locale].home
}

/**
 * Build the localised path for the projects index.
 * @param {LocaleCode} locale - Target locale code.
 * @returns {string} Absolute path on the public site.
 */
function projectsIndexUrl(locale: LocaleCode): string {
  const config: LocalePaths = localePathConfig[locale]
  return `${config.prefix}${config.projects}`
}

/**
 * Build the localised path for the contact page.
 * @param {LocaleCode} locale - Target locale code.
 * @returns {string} Absolute path on the public site.
 */
function contactUrl(locale: LocaleCode): string {
  const config: LocalePaths = localePathConfig[locale]
  return `${config.prefix}${config.contact}`
}

/**
 * Build the localised path for a project detail page.
 * @param {LocaleCode} locale - Target locale code.
 * @param {string} slug - Project slug.
 * @returns {string} Absolute path on the public site.
 */
function projectDetailUrl(locale: LocaleCode, slug: string): string {
  return `${projectsIndexUrl(locale)}/${slug}`
}

/**
 * Build the hreflang alternatives list using the same builder for every locale.
 * @param {(locale: LocaleCode) => string} builder - Function returning the URL per locale.
 * @returns {{ hreflang: string; href: string }[]} List of hreflang alternatives.
 */
function alternatives(builder: (locale: LocaleCode) => string): { hreflang: string; href: string }[] {
  return localeCodes.map((locale: LocaleCode) => ({
    hreflang: locale,
    href: builder(locale),
  }))
}

export default defineEventHandler(() => {
  const entries: SitemapEntry[] = localeCodes.flatMap((locale: LocaleCode): SitemapEntry[] => {
    const projects: { slug: string }[] = projectsByLocale[locale]

    return [
      {
        loc: homeUrl(locale),
        _i18nTransform: false,
        alternatives: alternatives(homeUrl),
      },
      {
        loc: projectsIndexUrl(locale),
        _i18nTransform: false,
        alternatives: alternatives(projectsIndexUrl),
      },
      {
        loc: contactUrl(locale),
        _i18nTransform: false,
        alternatives: alternatives(contactUrl),
      },
      ...projects.map(
        (project: { slug: string }): SitemapEntry => ({
          loc: projectDetailUrl(locale, project.slug),
          _i18nTransform: false,
          alternatives: alternatives((alt: LocaleCode) => projectDetailUrl(alt, project.slug)),
        }),
      ),
    ]
  })

  return entries
})
