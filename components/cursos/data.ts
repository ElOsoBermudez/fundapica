import { BriefcaseBusiness, Users, type LucideIcon } from "lucide-react"

export type CourseType = "personas" | "empresas"

export type CourseItem = {
  title: string
  description: string
}

export type CourseCategory = {
  slug: string
  title: string
  description: string
  courses: CourseItem[]
}

export type CourseAudience = {
  type: CourseType
  icon: LucideIcon
  title: string
  description: string
  points: string[]
  buttonLabel: string
}

const courseCatalog: Record<CourseType, CourseCategory[]> = {
  personas: [
    {
      slug: "habilidades",
      title: "Habilidades",
      description: "Recursos para fortalecer competencias transversales y comunicacion efectiva.",
      courses: [
        {
          title: "Comunicacion efectiva",
          description: "Practicas para expresarte con claridad en contextos personales y profesionales.",
        },
        {
          title: "Trabajo en equipo",
          description: "Dinamicas para colaborar mejor, escuchar activamente y coordinar objetivos comunes.",
        },
        {
          title: "Resolucion de conflictos",
          description: "Herramientas para gestionar conversaciones dificiles y buscar acuerdos utiles.",
        },
      ],
    },
    {
      slug: "gestion-personal",
      title: "Gestion personal",
      description: "Contenidos para organizacion, autonomia, foco y desarrollo de habitos.",
      courses: [
        {
          title: "Organizacion del tiempo",
          description: "Metodos practicos para priorizar tareas y reducir la sensacion de saturacion.",
        },
        {
          title: "Habitos sostenibles",
          description: "Rutinas simples para mantener constancia y mejorar tu dia a dia.",
        },
        {
          title: "Productividad consciente",
          description: "Estrategias para avanzar con foco sin perder bienestar personal.",
        },
      ],
    },
    {
      slug: "laboral",
      title: "Laboral",
      description: "Formacion orientada a empleabilidad, adaptacion al entorno profesional y mejora continua.",
      courses: [
        {
          title: "Preparacion para entrevistas",
          description: "Claves para presentar tu perfil con confianza y responder con criterio.",
        },
        {
          title: "Marca profesional",
          description: "Como ordenar tu experiencia y comunicar mejor tu propuesta de valor.",
        },
        {
          title: "Entorno de trabajo digital",
          description: "Bases para desenvolverte en herramientas y dinamicas habituales del trabajo actual.",
        },
      ],
    },
    {
      slug: "igualdad",
      title: "Igualdad",
      description: "Materiales para sensibilizacion, inclusion y buenas practicas aplicadas.",
      courses: [
        {
          title: "Igualdad de oportunidades",
          description: "Introduccion a principios y acciones para entornos mas justos e inclusivos.",
        },
        {
          title: "Prevencion de sesgos",
          description: "Recursos para detectar sesgos cotidianos y actuar con mas conciencia.",
        },
        {
          title: "Convivencia respetuosa",
          description: "Buenas practicas para fomentar relaciones saludables en distintos contextos.",
        },
      ],
    },
    {
      slug: "competencias-digitales",
      title: "Competencias digitales",
      description: "Iniciacion a herramientas y habilidades digitales utiles para la vida y el empleo.",
      courses: [
        {
          title: "Herramientas colaborativas",
          description: "Uso basico de plataformas para comunicacion, documentos y trabajo compartido.",
        },
        {
          title: "Seguridad digital",
          description: "Buenas practicas para proteger datos, cuentas y dispositivos.",
        },
        {
          title: "Busqueda de informacion",
          description: "Tecnicas para localizar, filtrar y aprovechar informacion fiable en internet.",
        },
      ],
    },
  ],
  empresas: [
    {
      slug: "talento",
      title: "Talento",
      description: "Programas de desarrollo de personas, acompanamiento y crecimiento interno.",
      courses: [
        {
          title: "Onboarding efectivo",
          description: "Procesos para integrar nuevas incorporaciones con claridad y rapidez.",
        },
        {
          title: "Planes de desarrollo",
          description: "Herramientas para detectar potencial y construir itinerarios de crecimiento.",
        },
        {
          title: "Evaluacion constructiva",
          description: "Enfoques para dar feedback util y favorecer la mejora continua.",
        },
      ],
    },
    {
      slug: "liderazgo",
      title: "Liderazgo",
      description: "Formacion en coordinacion, gestion de equipos y toma de decisiones.",
      courses: [
        {
          title: "Liderazgo de equipos",
          description: "Bases para dirigir con claridad, cercania y orientacion a resultados.",
        },
        {
          title: "Delegacion inteligente",
          description: "Criterios para repartir responsabilidades sin perder seguimiento.",
        },
        {
          title: "Reuniones con impacto",
          description: "Metodos para estructurar reuniones mas utiles, breves y accionables.",
        },
      ],
    },
    {
      slug: "cumplimiento",
      title: "Cumplimiento",
      description: "Contenidos corporativos, normativos y de buenas practicas operativas.",
      courses: [
        {
          title: "Cumplimiento normativo",
          description: "Panorama general de obligaciones y procedimientos internos esenciales.",
        },
        {
          title: "Proteccion de datos",
          description: "Buenas practicas para el manejo responsable de informacion sensible.",
        },
        {
          title: "Canales y protocolos",
          description: "Uso correcto de procedimientos internos y circuitos de reporte.",
        },
      ],
    },
    {
      slug: "cultura",
      title: "Cultura",
      description: "Iniciativas de inclusion, bienestar y cohesion organizativa.",
      courses: [
        {
          title: "Bienestar laboral",
          description: "Acciones para reforzar el equilibrio, la motivacion y el clima interno.",
        },
        {
          title: "Cultura colaborativa",
          description: "Practicas para mejorar la confianza, la coordinacion y el sentido de equipo.",
        },
        {
          title: "Diversidad e inclusion",
          description: "Bases para construir entornos de trabajo respetuosos y sostenibles.",
        },
      ],
    },
  ],
}

export const courseAudiences: CourseAudience[] = [
  {
    type: "personas",
    icon: Users,
    title: "Personas",
    description: "Formacion practica para mejorar habilidades, empleabilidad y crecimiento profesional.",
    points: [
      "Cinco categorias pensadas para perfiles y objetivos distintos",
      "Rutas introductorias y avanzadas para aprender a tu ritmo",
      "Contenidos enfocados en aplicacion real y progreso continuo",
    ],
    buttonLabel: "Ver cursos para personas",
  },
  {
    type: "empresas",
    icon: BriefcaseBusiness,
    title: "Empresas",
    description: "Programas orientados a equipos, liderazgo y actualizacion de competencias clave.",
    points: [
      "Cuatro areas para equipos, liderazgo y cultura organizativa",
      "Planes adaptables a objetivos de negocio y desarrollo interno",
      "Base clara para escalar a soluciones corporativas a medida",
    ],
    buttonLabel: "Ver cursos para empresas",
  },
]

export function getCategoriesByType(type: CourseType) {
  return courseCatalog[type]
}

export function getCategoryBySlug(type: CourseType, slug: string) {
  return courseCatalog[type].find((category) => category.slug === slug)
}
