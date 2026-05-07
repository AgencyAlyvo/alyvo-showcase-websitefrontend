import type { Project } from '#src-nuxt/shared/types/project'

/**
 * Source de données projets. À remplacer par une vraie DB lorsque disponible.
 * Le contrat (forme) reste inchangé pour les pages côté client.
 */
export const projects: Project[] = [
  {
    id: 'atelier-bois',
    goals: ['visibility', 'conversion'],
    status: 'published',
    cover: {
      src: '/images/projects/atelier-bois-cover.jpg',
      alt: 'Site vitrine Atelier Bois',
    },
    gallery: [
      { src: '/images/projects/atelier-bois-1.jpg', alt: 'Page accueil' },
      { src: '/images/projects/atelier-bois-2.jpg', alt: 'Page produit' },
    ],
    stack: ['Nuxt 4', 'TypeScript', 'Tailwind CSS', 'Directus', 'Vercel'],
    translations: {
      fr: {
        slug: 'atelier-bois-site-conversion',
        title: 'Atelier Bois — un site qui transforme les visiteurs en clients',
        tagline: 'Refonte orientée conversion pour un atelier de menuiserie haut de gamme',
        benefit: '+38% de demandes qualifiées en 3 mois',
        needSummary: 'Site vitrine ancien qui ne générait pas assez de demandes.',
        solutionSummary: 'Refonte premium centrée sur la prise de contact et la preuve.',
        resultSummary: 'Demandes qualifiées multipliées et SEO local renforcé.',
        context:
          'Atelier Bois est une menuiserie de prestige spécialisée dans le mobilier sur mesure. Son site existant était ancien, peu lisible sur mobile et sa page contact convertissait peu.',
        problem:
          "Beaucoup de trafic organique, mais peu de demandes qualifiées. Le message ne mettait pas en avant le travail réel ni la valeur unique de l'atelier.",
        objective:
          "Augmenter le nombre de demandes qualifiées via le site sans augmenter le budget d'acquisition payant.",
        solutionWhat:
          'Refonte complète du site vitrine avec un parcours guidé vers le formulaire de devis, des pages projet structurées en cas client et une stratégie SEO local.',
        solutionWhy:
          'Une approche éditoriale claire et un design haut de gamme pour refléter la qualité réelle des produits, et faire confiance dès la première visite.',
        solutionHow:
          'Architecture en sections orientées bénéfices, preuves visuelles fortes, formulaire qualifiant, balisage Schema.org et performances optimisées.',
        features: [
          {
            title: 'Page projet en cas client',
            description: 'Chaque réalisation est présentée avec besoin, solution, résultat.',
          },
          {
            title: 'Formulaire qualifiant',
            description: 'Champs ciblés pour pré-qualifier la demande avant le rendez-vous.',
          },
          {
            title: 'SEO local',
            description: 'Pages localisées, balisage Schema.org et fiche optimisée pour les requêtes ciblées.',
          },
        ],
        stakes: [
          { key: 'visibility', label: 'Visibilité' },
          { key: 'conversion', label: 'Conversion' },
          { key: 'experience', label: 'Expérience utilisateur' },
        ],
        results: [
          { key: 'gains', label: 'Demandes qualifiées', value: '+38%' },
          { key: 'performance', label: 'LCP', value: '< 1,8s' },
          { key: 'seo', label: 'Clics organiques', value: '+62%' },
        ],
        seoTitle: 'Refonte de site Atelier Bois — Cas client conversion et SEO',
        seoDescription:
          "Étude de cas : refonte d'un site vitrine premium, +38% de demandes qualifiées et performance SEO renforcée. Approche orientée besoin client.",
      },
      en: {
        slug: 'atelier-bois-conversion-website',
        title: 'Atelier Bois — A website that turns visitors into clients',
        tagline: 'Conversion-focused redesign for a premium woodworking workshop',
        benefit: '+38% qualified leads in 3 months',
        needSummary: "An old marketing site that wasn't generating enough leads.",
        solutionSummary: 'A premium redesign focused on lead capture and proof.',
        resultSummary: 'Qualified leads multiplied and stronger local SEO.',
        context:
          'Atelier Bois is a premium carpentry workshop specialised in custom furniture. Their previous site was outdated, hard to read on mobile, and their contact page converted poorly.',
        problem:
          "A lot of organic traffic, but few qualified leads. The message didn't reflect the real craft or the unique value of the workshop.",
        objective:
          'Grow the number of qualified leads coming from the site without increasing the paid acquisition budget.',
        solutionWhat:
          'Full marketing site redesign with a guided journey towards the quote form, project pages structured as case studies and a local SEO strategy.',
        solutionWhy:
          'A clear editorial approach and a premium design to reflect the real quality of the products, and build trust from the first visit.',
        solutionHow:
          'Benefit-driven sections, strong visual proof, qualifying form, Schema.org markup and optimized performance.',
        features: [
          {
            title: 'Project pages as case studies',
            description: 'Each project is presented with need, solution and result.',
          },
          { title: 'Qualifying form', description: 'Targeted fields to pre-qualify the request before any call.' },
          {
            title: 'Local SEO',
            description: 'Localised pages, Schema.org markup and optimized listing for targeted queries.',
          },
        ],
        stakes: [
          { key: 'visibility', label: 'Visibility' },
          { key: 'conversion', label: 'Conversion' },
          { key: 'experience', label: 'User experience' },
        ],
        results: [
          { key: 'gains', label: 'Qualified leads', value: '+38%' },
          { key: 'performance', label: 'LCP', value: '< 1.8s' },
          { key: 'seo', label: 'Organic clicks', value: '+62%' },
        ],
        seoTitle: 'Atelier Bois website redesign — Conversion and SEO case study',
        seoDescription:
          'Case study: a premium marketing site redesign, +38% qualified leads and stronger SEO performance. A need-first approach.',
      },
      es: {
        slug: 'atelier-bois-sitio-conversion',
        title: 'Atelier Bois — Un sitio que convierte visitas en clientes',
        tagline: 'Rediseño orientado a conversión para un taller de carpintería premium',
        benefit: '+38% de solicitudes cualificadas en 3 meses',
        needSummary: 'Un sitio antiguo que no generaba suficientes solicitudes.',
        solutionSummary: 'Rediseño premium enfocado en captación y prueba.',
        resultSummary: 'Solicitudes cualificadas multiplicadas y SEO local reforzado.',
        context:
          'Atelier Bois es un taller de carpintería premium especializado en mobiliario a medida. Su antiguo sitio estaba desfasado, era poco legible en móvil y la página de contacto convertía poco.',
        problem:
          'Mucho tráfico orgánico pero pocas solicitudes cualificadas. El mensaje no reflejaba el trabajo real ni el valor único del taller.',
        objective:
          'Aumentar las solicitudes cualificadas desde el sitio sin subir el presupuesto de captación de pago.',
        solutionWhat:
          'Rediseño completo del sitio con un recorrido guiado hacia el formulario de presupuesto, páginas de proyecto en formato caso cliente y estrategia SEO local.',
        solutionWhy:
          'Un enfoque editorial claro y un diseño premium para reflejar la calidad real de los productos y generar confianza desde la primera visita.',
        solutionHow:
          'Secciones orientadas a beneficios, prueba visual fuerte, formulario cualificador, marcado Schema.org y rendimiento optimizado.',
        features: [
          {
            title: 'Páginas de proyecto como casos cliente',
            description: 'Cada proyecto se presenta con necesidad, solución y resultado.',
          },
          {
            title: 'Formulario cualificador',
            description: 'Campos pensados para precualificar la solicitud antes de la llamada.',
          },
          {
            title: 'SEO local',
            description: 'Páginas localizadas, marcado Schema.org y ficha optimizada para consultas objetivo.',
          },
        ],
        stakes: [
          { key: 'visibility', label: 'Visibilidad' },
          { key: 'conversion', label: 'Conversión' },
          { key: 'experience', label: 'Experiencia de usuario' },
        ],
        results: [
          { key: 'gains', label: 'Solicitudes cualificadas', value: '+38%' },
          { key: 'performance', label: 'LCP', value: '< 1,8s' },
          { key: 'seo', label: 'Clics orgánicos', value: '+62%' },
        ],
        seoTitle: 'Rediseño Atelier Bois — Caso cliente conversión y SEO',
        seoDescription:
          'Caso de estudio: rediseño premium, +38% de solicitudes cualificadas y SEO reforzado. Enfoque centrado en la necesidad del cliente.',
      },
    },
  },
  {
    id: 'fluxops',
    goals: ['automation', 'time', 'tool'],
    status: 'published',
    cover: {
      src: '/images/projects/fluxops-cover.jpg',
      alt: 'Outil interne FluxOps',
    },
    gallery: [
      { src: '/images/projects/fluxops-1.jpg', alt: 'Dashboard principal' },
      { src: '/images/projects/fluxops-2.jpg', alt: 'Vue détaillée d’un flux' },
    ],
    stack: ['Nuxt 4', 'Pinia', 'PostgreSQL', 'NestJS', 'Docker'],
    translations: {
      fr: {
        slug: 'fluxops-automatisation-metier',
        title: 'FluxOps — un outil interne qui économise 12h par semaine',
        tagline: 'Automatisation et centralisation pour une équipe opérations',
        benefit: '12 heures par semaine économisées sur les tâches manuelles',
        needSummary: 'Tâches répétitives entre tableurs, mails et factures.',
        solutionSummary: 'Outil interne sur mesure avec automatisations et tableau de bord unique.',
        resultSummary: 'Process unifié, erreurs réduites, équipe focalisée sur la valeur.',
        context:
          "Une PME de services gérait son activité opérationnelle entre Excel, mails et un ERP partiellement utilisé. L'équipe ressaisissait les mêmes données plusieurs fois par jour.",
        problem:
          "Plusieurs heures perdues chaque semaine, des erreurs récurrentes et aucune visibilité claire sur l'activité en temps réel.",
        objective:
          "Centraliser les flux opérationnels, automatiser les actions à faible valeur et offrir une vision claire à l'équipe.",
        solutionWhat:
          'Application web interne avec import automatique des factures, workflow de validation et tableau de bord temps réel.',
        solutionWhy:
          "Un outil sur mesure parlait le langage métier exact de l'équipe, sans imposer un ERP générique trop rigide.",
        solutionHow: 'Modules dédiés par flux, automatisations configurables, audit log et permissions granulaires.',
        features: [
          {
            title: 'Automatisations configurables',
            description: 'L’équipe ajuste elle-même les règles d’automatisation.',
          },
          { title: 'Tableau de bord temps réel', description: 'Indicateurs clés visibles d’un coup d’œil.' },
          { title: 'Audit log', description: 'Traçabilité complète des actions, sans dépendance externe.' },
        ],
        stakes: [
          { key: 'time', label: 'Temps perdu' },
          { key: 'organization', label: 'Organisation' },
          { key: 'experience', label: 'Expérience interne' },
        ],
        results: [
          { key: 'gains', label: 'Temps gagné', value: '12h / semaine' },
          { key: 'improvement', label: 'Erreurs de saisie', value: '-80%' },
          { key: 'experience', label: 'Adoption équipe', value: '100%' },
        ],
        seoTitle: 'FluxOps — Outil métier sur mesure et automatisation interne',
        seoDescription:
          'Étude de cas : outil interne et automatisation qui économisent 12h par semaine et réduisent les erreurs de 80%.',
      },
      en: {
        slug: 'fluxops-business-automation',
        title: 'FluxOps — An internal tool that saves 12h a week',
        tagline: 'Automation and centralisation for an operations team',
        benefit: '12 hours per week saved on manual work',
        needSummary: 'Repetitive tasks between spreadsheets, emails and invoices.',
        solutionSummary: 'Custom internal tool with automations and a single dashboard.',
        resultSummary: 'Unified process, fewer errors, team focused on real value.',
        context:
          'A services company was running its operations between Excel, emails and a partially used ERP. The team was re-entering the same data several times a day.',
        problem: 'Several hours lost every week, recurring errors and no clear real-time view of activity.',
        objective: 'Centralise operational flows, automate low-value actions and give the team a clear view.',
        solutionWhat:
          'An internal web app with automated invoice import, a validation workflow and a real-time dashboard.',
        solutionWhy: 'A custom tool spoke the exact business language of the team without forcing a rigid generic ERP.',
        solutionHow: 'Modules per flow, configurable automations, audit log and granular permissions.',
        features: [
          { title: 'Configurable automations', description: 'The team adjusts the automation rules themselves.' },
          { title: 'Real-time dashboard', description: 'Key indicators visible at a glance.' },
          { title: 'Audit log', description: 'Full traceability with no external dependency.' },
        ],
        stakes: [
          { key: 'time', label: 'Wasted time' },
          { key: 'organization', label: 'Organization' },
          { key: 'experience', label: 'Internal experience' },
        ],
        results: [
          { key: 'gains', label: 'Time saved', value: '12h / week' },
          { key: 'improvement', label: 'Data errors', value: '-80%' },
          { key: 'experience', label: 'Team adoption', value: '100%' },
        ],
        seoTitle: 'FluxOps — Custom internal tool and business automation',
        seoDescription: 'Case study: internal tool and automation that save 12h a week and reduce errors by 80%.',
      },
      es: {
        slug: 'fluxops-automatizacion-negocio',
        title: 'FluxOps — Una herramienta interna que ahorra 12h a la semana',
        tagline: 'Automatización y centralización para un equipo de operaciones',
        benefit: '12 horas a la semana ahorradas en trabajo manual',
        needSummary: 'Tareas repetitivas entre hojas, correos y facturas.',
        solutionSummary: 'Herramienta interna a medida con automatizaciones y un único dashboard.',
        resultSummary: 'Proceso unificado, menos errores, equipo enfocado en lo que aporta valor.',
        context:
          'Una pyme de servicios gestionaba sus operaciones entre Excel, correos y un ERP parcialmente usado. El equipo reintroducía los mismos datos varias veces al día.',
        problem: 'Horas perdidas cada semana, errores recurrentes y sin visibilidad clara en tiempo real.',
        objective: 'Centralizar los flujos operativos, automatizar acciones de poco valor y dar visibilidad al equipo.',
        solutionWhat:
          'Aplicación web interna con importación automática de facturas, flujo de validación y dashboard en tiempo real.',
        solutionWhy:
          'Una herramienta a medida hablaba el lenguaje exacto del negocio, sin un ERP genérico demasiado rígido.',
        solutionHow: 'Módulos por flujo, automatizaciones configurables, audit log y permisos granulares.',
        features: [
          {
            title: 'Automatizaciones configurables',
            description: 'El equipo ajusta las reglas de automatización por sí mismo.',
          },
          { title: 'Dashboard en tiempo real', description: 'Indicadores clave visibles de un vistazo.' },
          { title: 'Audit log', description: 'Trazabilidad completa, sin dependencias externas.' },
        ],
        stakes: [
          { key: 'time', label: 'Tiempo perdido' },
          { key: 'organization', label: 'Organización' },
          { key: 'experience', label: 'Experiencia interna' },
        ],
        results: [
          { key: 'gains', label: 'Tiempo ganado', value: '12h / semana' },
          { key: 'improvement', label: 'Errores de datos', value: '-80%' },
          { key: 'experience', label: 'Adopción del equipo', value: '100%' },
        ],
        seoTitle: 'FluxOps — Herramienta interna a medida y automatización',
        seoDescription:
          'Caso de estudio: herramienta interna y automatización que ahorran 12h a la semana y reducen los errores en un 80%.',
      },
    },
  },
  {
    id: 'kairos',
    goals: ['launch', 'tool'],
    status: 'published',
    cover: {
      src: '/images/projects/kairos-cover.jpg',
      alt: 'Application Kairos',
    },
    gallery: [
      { src: '/images/projects/kairos-1.jpg', alt: 'Onboarding utilisateur' },
      { src: '/images/projects/kairos-2.jpg', alt: 'Tableau de planification' },
    ],
    stack: ['Nuxt 4', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Cloudflare'],
    translations: {
      fr: {
        slug: 'kairos-mvp-saas',
        title: "Kairos — d'une idée à un MVP utile en 8 semaines",
        tagline: 'Lancement d’un SaaS de planification pour PME',
        benefit: 'MVP utilisable, premiers clients payants au lancement',
        needSummary: 'Une idée claire mais pas de version utilisable pour la valider.',
        solutionSummary: 'MVP focalisé sur le coeur de valeur, prêt à être testé.',
        resultSummary: 'Premiers clients payants dès le lancement, base évolutive.',
        context:
          "Un fondateur souhaitait lancer un SaaS de planification pour PME, mais n'avait ni équipe technique ni budget illimité.",
        problem:
          "L'idée était claire, mais sans version testable, il était impossible de valider l'intérêt réel ou d'attirer des early adopters.",
        objective: 'Mettre en ligne un MVP réellement utile, capable de convaincre les premiers clients payants.',
        solutionWhat:
          'Un MVP centré sur la valeur principale (création et partage de plannings simples), avec un onboarding clair et une facturation intégrée.',
        solutionWhy: 'Limiter le périmètre au strict utile pour livrer vite, valider et améliorer ensuite.',
        solutionHow:
          'Stack moderne, développement itératif, tests utilisateurs continus et automatisation des opérations clés.',
        features: [
          { title: 'Onboarding rapide', description: 'L’utilisateur crée son premier planning en moins de 2 minutes.' },
          { title: 'Partage simple', description: 'Liens publics et privés, accès contrôlé.' },
          { title: 'Facturation intégrée', description: 'Stripe et plans configurables dès le MVP.' },
        ],
        stakes: [
          { key: 'launch', label: 'Lancement produit' },
          { key: 'experience', label: 'Expérience utilisateur' },
          { key: 'organization', label: 'Organisation' },
        ],
        results: [
          { key: 'gains', label: 'Premiers clients', value: '14 en 30 jours' },
          { key: 'experience', label: 'Onboarding', value: '< 2 min' },
          { key: 'performance', label: 'Disponibilité', value: '99,9%' },
        ],
        seoTitle: 'Kairos — MVP SaaS livré en 8 semaines',
        seoDescription:
          'Étude de cas : un MVP SaaS de planification livré en 8 semaines, avec premiers clients payants dès le lancement.',
      },
      en: {
        slug: 'kairos-saas-mvp',
        title: 'Kairos — From idea to a useful MVP in 8 weeks',
        tagline: 'Launching a planning SaaS for SMBs',
        benefit: 'A usable MVP and first paying customers at launch',
        needSummary: 'A clear idea but no usable version to validate it.',
        solutionSummary: 'An MVP focused on the core value, ready to be tested.',
        resultSummary: 'First paying customers at launch, scalable base.',
        context:
          'A founder wanted to launch a planning SaaS for SMBs but had neither a technical team nor an unlimited budget.',
        problem:
          'The idea was clear, but without a testable version it was impossible to validate real interest or attract early adopters.',
        objective: 'Ship a truly useful MVP capable of convincing the first paying customers.',
        solutionWhat:
          'An MVP focused on the core value (creating and sharing simple plannings), with a clear onboarding and integrated billing.',
        solutionWhy: 'Constrain the scope to the strict essentials to ship fast, validate and improve afterwards.',
        solutionHow: 'Modern stack, iterative development, continuous user testing and automation of key ops.',
        features: [
          { title: 'Fast onboarding', description: 'A user creates their first planning in under 2 minutes.' },
          { title: 'Simple sharing', description: 'Public and private links, controlled access.' },
          { title: 'Integrated billing', description: 'Stripe and configurable plans from the MVP.' },
        ],
        stakes: [
          { key: 'launch', label: 'Product launch' },
          { key: 'experience', label: 'User experience' },
          { key: 'organization', label: 'Organization' },
        ],
        results: [
          { key: 'gains', label: 'First customers', value: '14 in 30 days' },
          { key: 'experience', label: 'Onboarding', value: '< 2 min' },
          { key: 'performance', label: 'Uptime', value: '99.9%' },
        ],
        seoTitle: 'Kairos — SaaS MVP delivered in 8 weeks',
        seoDescription: 'Case study: a planning SaaS MVP delivered in 8 weeks, with first paying customers at launch.',
      },
      es: {
        slug: 'kairos-mvp-saas',
        title: 'Kairos — De una idea a un MVP útil en 8 semanas',
        tagline: 'Lanzamiento de un SaaS de planificación para pymes',
        benefit: 'MVP utilizable y primeros clientes de pago al lanzamiento',
        needSummary: 'Una idea clara pero sin versión usable para validar el interés.',
        solutionSummary: 'MVP centrado en el valor principal, listo para probar.',
        resultSummary: 'Primeros clientes de pago desde el lanzamiento, base escalable.',
        context:
          'Un fundador quería lanzar un SaaS de planificación para pymes pero no tenía equipo técnico ni presupuesto ilimitado.',
        problem:
          'La idea era clara, pero sin una versión testable era imposible validar el interés real o atraer early adopters.',
        objective: 'Lanzar un MVP realmente útil capaz de convencer a los primeros clientes de pago.',
        solutionWhat:
          'Un MVP centrado en el valor principal (crear y compartir planificaciones simples), con onboarding claro y facturación integrada.',
        solutionWhy: 'Limitar el alcance a lo estrictamente útil para lanzar rápido, validar y mejorar después.',
        solutionHow:
          'Stack moderno, desarrollo iterativo, pruebas continuas de usuarios y automatización de operaciones clave.',
        features: [
          {
            title: 'Onboarding rápido',
            description: 'El usuario crea su primera planificación en menos de 2 minutos.',
          },
          { title: 'Compartir simple', description: 'Enlaces públicos y privados, acceso controlado.' },
          { title: 'Facturación integrada', description: 'Stripe y planes configurables desde el MVP.' },
        ],
        stakes: [
          { key: 'launch', label: 'Lanzamiento de producto' },
          { key: 'experience', label: 'Experiencia de usuario' },
          { key: 'organization', label: 'Organización' },
        ],
        results: [
          { key: 'gains', label: 'Primeros clientes', value: '14 en 30 días' },
          { key: 'experience', label: 'Onboarding', value: '< 2 min' },
          { key: 'performance', label: 'Disponibilidad', value: '99,9%' },
        ],
        seoTitle: 'Kairos — MVP SaaS entregado en 8 semanas',
        seoDescription:
          'Caso de estudio: un MVP SaaS de planificación entregado en 8 semanas, con primeros clientes de pago al lanzamiento.',
      },
    },
  },
]
