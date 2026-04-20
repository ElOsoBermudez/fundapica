import { BriefcaseBusiness, Users, type LucideIcon } from "lucide-react"

export type CourseType = "personas" | "empresas"

export type CourseItem = {
  title: string
  description: string
  badge?: string
  image?: string
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

///////////////////////////////////////////////////////////////////////////
//////                            PERSONAS                           //////
///////////////////////////////////////////////////////////////////////////

const courseCatalog: Record<CourseType, CourseCategory[]> = {
  personas: [
    {
      slug: "habilidades",
      title: "Habilidades",
      description: "Recursos para fortalecer competencias transversales y comunicacion efectiva.",
      courses: [
        {
          title: "Escucha activa, empatía y asertividad",
          description: "Curso para mejorar tu comunicación, aprender a comprender a los demás y expresarte con claridad y respeto.",
          badge: "ADGD096PO",
          image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        },
        {
          title: "Habilidades sociales de comunicación y resolución de conflictos en el centro de trabajo",
          description: "Dinamicas para colaborar mejor, escuchar activamente y coordinar objetivos comunes.",
          badge: "ADGD151PO",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        },
        {
          title: "Hablar en público: presentaciones eficaces",
          description: "Herramientas para gestionar conversaciones dificiles y buscar acuerdos utiles.",
          badge: "ADGD152PO",
          image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
        },
        {
          title: "Comunicación y trabajo en equipo en hostelería",
          description: "Herramientas para gestionar conversaciones dificiles y buscar acuerdos utiles.",
          badge: "ADGD10",
          image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
        },
        {
          title: "Habilidades sociales: Comunicación, inteligencia emocional y trabajo en equipo",
          description: "Herramientas para gestionar conversaciones dificiles y buscar acuerdos utiles.",
          badge: "ADGD149PO",
          image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
        },
        {
          title: "Técnicas para hablar en público",
          description: "Herramientas para gestionar conversaciones dificiles y buscar acuerdos utiles.",
          badge: "ADGD261PO",
          image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
        },
        {
          title: "Trabajo en equipo",
          description: "Herramientas para gestionar conversaciones dificiles y buscar acuerdos utiles.",
          badge: "ADGD265PO",
          image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
        },
        {
          title: "Inteligencia emocional en la empresa y gestión de cualidades",
          description: "Herramientas para gestionar conversaciones dificiles y buscar acuerdos utiles.",
          badge: "ADGD167PO",
          image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
        },
        {
          title: "Inglés elemental para el departamento de pisos",
          description: "Herramientas para gestionar conversaciones dificiles y buscar acuerdos utiles.",
          badge: "FCOE01",
          image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
        },
        {
          title: "Atención al cliente en inglés en el servicio de restauración",
          description: "Herramientas para gestionar conversaciones dificiles y buscar acuerdos utiles.",
          badge: "FCOE02",
          image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
        },
        {
          title: "Agente de igualdad",
          description: "Herramientas para gestionar conversaciones dificiles y buscar acuerdos utiles.",
          badge: "SSCE0001",
          image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
        },


      ],
    },

    /////////////////////////   GESTIÓN PERSONAL   ////////////////////// 

    {
      slug: "gestion-personal",
      title: "Gestion personal",
      description: "Contenidos para organizacion, autonomia, foco y desarrollo de habitos.",
      courses: [
        {
          title: "Mediación y resolución de conflictos",
          description: "Metodos practicos para priorizar tareas y reducir la sensacion de saturacion.",
          badge: "ADGD178PO",
          image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335",
        },
        {
          title: "Gestión de las emociones",
          description: "Rutinas simples para mantener constancia y mejorar tu dia a dia.",
          badge: "ADGD123PO",
          image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88",
        },
        {
          title: "Gestión del tiempo",
          description: "Estrategias para avanzar con foco sin perder bienestar personal.",
          badge: "ADGD135PO",
          image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
        },
        {
          title: "Aprender a aprender",
          description: "Estrategias para avanzar con foco sin perder bienestar personal.",
          badge: "FCOV36",
          image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
        },
      ],
    },

      /////////////////////////   LABORAL   ////////////////////// 

    {
      slug: "laboral",
      title: "Laboral",
      description: "Formacion orientada a empleabilidad, adaptacion al entorno profesional y mejora continua.",
      courses: [
        {
          title: "Telemarketing",
          description: "Claves para presentar tu perfil con confianza y responder con criterio.",
          badge: "Empleo",
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
        },
        {
          title: "Atención al cliente y calidad de servicio",
          description: "Como ordenar tu experiencia y comunicar mejor tu propuesta de valor.",
          badge: "Career",
          image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5",
        },
        {
          title: "Inserción laboral, sensibilización medioambiental y en la igualdad de género",
          description: "Bases para desenvolverte en herramientas y dinamicas habituales del trabajo actual.",
          badge: "Digital",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        },
        {
          title: "Básico de prevención de riesgos laborales",
          description: "Claves para presentar tu perfil con confianza y responder con criterio.",
          badge: "Empleo",
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
        },
        {
          title: "Igualdad de género en el ámbito laboral",
          description: "Como ordenar tu experiencia y comunicar mejor tu propuesta de valor.",
          badge: "Career",
          image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5",
        },
        {
          title: "Fundraising, captación de fondos para entidades sociales",
          description: "Bases para desenvolverte en herramientas y dinamicas habituales del trabajo actual.",
          badge: "Digital",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        },
        {
          title: "Emprendimiento: Nociones",
          description: "Claves para presentar tu perfil con confianza y responder con criterio.",
          badge: "Empleo",
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
        },
        {
          title: "Comunicación y trabajo en equipo en hostelería",
          description: "Como ordenar tu experiencia y comunicar mejor tu propuesta de valor.",
          badge: "Career",
          image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5",
        },
        {
          title: "Entorno de trabajo digital",
          description: "Bases para desenvolverte en herramientas y dinamicas habituales del trabajo actual.",
          badge: "Digital",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        },
      ],
    },

      /////////////////////////   IGUALDAD   ////////////////////// 

    {
      slug: "igualdad",
      title: "Igualdad",
      description: "Materiales para sensibilizacion, inclusion y buenas practicas aplicadas.",
      courses: [
        {
          title: "Igualdad de oportunidades",
          description: "Introduccion a principios y acciones para entornos mas justos e inclusivos.",
          badge: "Inclusión",
          image: "https://images.unsplash.com/photo-1522202220310-3d7c4b6b2b32",
        },
        {
          title: "Prevencion de sesgos",
          description: "Recursos para detectar sesgos cotidianos y actuar con mas conciencia.",
          badge: "Conciencia",
          image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        },
        {
          title: "Convivencia respetuosa",
          description: "Buenas practicas para fomentar relaciones saludables en distintos contextos.",
          badge: "Social",
          image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
        },
      ],
    },

      /////////////////////////   INFORMÁTICA   ////////////////////// 

    {
      slug: "competencias-digitales",
      title: "Competencias digitales",
      description: "Iniciacion a herramientas y habilidades digitales utiles para la vida y el empleo.",
      courses: [
        {
          title: "Herramientas colaborativas",
          description: "Uso basico de plataformas para comunicacion, documentos y trabajo compartido.",
          badge: "Tools",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        },
        {
          title: "Seguridad digital",
          description: "Buenas practicas para proteger datos, cuentas y dispositivos.",
          badge: "Seguridad",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
        },
        {
          title: "Busqueda de informacion",
          description: "Tecnicas para localizar, filtrar y aprovechar informacion fiable en internet.",
          badge: "Info",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        },
      ],
    },
  ],

///////////////////////////////////////////////////////////////////////////
//////                            EMPRESAS                           //////
///////////////////////////////////////////////////////////////////////////

  empresas: [
    {
      slug: "talento",
      title: "Talento",
      description: "Programas de desarrollo de personas, acompanamiento y crecimiento interno.",
      courses: [
        {
          title: "Onboarding efectivo",
          description: "Procesos para integrar nuevas incorporaciones con claridad y rapidez.",
          badge: "HR",
          image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        },
        {
          title: "Planes de desarrollo",
          description: "Herramientas para detectar potencial y construir itinerarios de crecimiento.",
          badge: "Growth",
          image: "https://images.unsplash.com/photo-1552581234-26160f608093",
        },
        {
          title: "Evaluacion constructiva",
          description: "Enfoques para dar feedback util y favorecer la mejora continua.",
          badge: "Feedback",
          image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
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
          badge: "Leadership",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        },
        {
          title: "Delegacion inteligente",
          description: "Criterios para repartir responsabilidades sin perder seguimiento.",
          badge: "Gestión",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
        },
        {
          title: "Reuniones con impacto",
          description: "Metodos para estructurar reuniones mas utiles, breves y accionables.",
          badge: "Eficiencia",
          image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
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
          badge: "Legal",
          image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
        },
        {
          title: "Proteccion de datos",
          description: "Buenas practicas para el manejo responsable de informacion sensible.",
          badge: "GDPR",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
        },
        {
          title: "Canales y protocolos",
          description: "Uso correcto de procedimientos internos y circuitos de reporte.",
          badge: "Policy",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
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
          badge: "Wellbeing",
          image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        },
        {
          title: "Cultura colaborativa",
          description: "Practicas para mejorar la confianza, la coordinacion y el sentido de equipo.",
          badge: "Team",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        },
        {
          title: "Diversidad e inclusion",
          description: "Bases para construir entornos de trabajo respetuosos y sostenibles.",
          badge: "D&I",
          image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
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