/**
 *
 */
export type ProjectGoal = 'visibility' | 'conversion' | 'time' | 'automation' | 'tool' | 'launch'

/**
 *
 */
export type ProjectLocale = 'fr' | 'en' | 'es'

/**
 *
 */
export interface ProjectImage {
  src: string
  alt: string
}

/**
 *
 */
export interface ProjectStake {
  key: string
  label: string
}

/**
 *
 */
export interface ProjectFeature {
  title: string
  description: string
}

/**
 *
 */
export interface ProjectResult {
  key: string
  label: string
  value?: string
}

/**
 *
 */
export interface ProjectTranslation {
  slug: string
  title: string
  tagline: string
  benefit: string
  needSummary: string
  solutionSummary: string
  resultSummary: string
  context: string
  problem: string
  objective: string
  solutionWhat: string
  solutionWhy: string
  solutionHow: string
  features: ProjectFeature[]
  stakes: ProjectStake[]
  results: ProjectResult[]
  seoTitle: string
  seoDescription: string
}

/**
 *
 */
export interface Project {
  id: string
  goals: ProjectGoal[]
  cover: ProjectImage
  gallery: ProjectImage[]
  stack: string[]
  status: 'published' | 'draft'
  translations: Record<ProjectLocale, ProjectTranslation>
}

/**
 *
 */
export interface ProjectListItem {
  id: string
  cover: ProjectImage
  goals: ProjectGoal[]
  stack: string[]
  translations: Record<
    ProjectLocale,
    Pick<
      ProjectTranslation,
      'slug' | 'title' | 'tagline' | 'benefit' | 'needSummary' | 'solutionSummary' | 'resultSummary'
    >
  >
}
