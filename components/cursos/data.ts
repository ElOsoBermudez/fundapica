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
      title: "Gestión personal",
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
          badge: "COMM19",
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
        },
        {
          title: "Atención al cliente y calidad de servicio",
          description: "Como ordenar tu experiencia y comunicar mejor tu propuesta de valor.",
          badge: "COMM002PO",
          image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5",
        },
        {
          title: "Inserción laboral, sensibilización medioambiental y en la igualdad de género",
          description: "Bases para desenvolverte en herramientas y dinamicas habituales del trabajo actual.",
          badge: "FCOO03",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        },
        {
          title: "Básico de prevención de riesgos laborales",
          description: "Claves para presentar tu perfil con confianza y responder con criterio.",
          badge: "FCOS02",
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
        },
        {
          title: "Igualdad de género en el ámbito laboral",
          description: "Como ordenar tu experiencia y comunicar mejor tu propuesta de valor.",
          badge: "CTRI0015",
          image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5",
        },
        {
          title: "Fundraising, captación de fondos para entidades sociales",
          description: "Bases para desenvolverte en herramientas y dinamicas habituales del trabajo actual.",
          badge: "ADGD0054",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        },
        {
          title: "Emprendimiento: Nociones",
          description: "Claves para presentar tu perfil con confianza y responder con criterio.",
          badge: "ADGD089PO",
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
        },
        {
          title: "Comunicación y trabajo en equipo en hostelería",
          description: "Como ordenar tu experiencia y comunicar mejor tu propuesta de valor.",
          badge: "ADGD10",
          image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5",
        },
        {
          title: "Telefonista recepcionista de oficinas",
          description: "Bases para desenvolverte en herramientas y dinamicas habituales del trabajo actual.",
          badge: "ADGI11DCP",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        },
        {
          title: "Uso de las redes sociales para la inserción sociolaboral",
          description: "Claves para presentar tu perfil con confianza y responder con criterio.",
          badge: "CTRD0012",
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
        },
        {
          title: "Derechos y deberes en el trabajo",
          description: "Como ordenar tu experiencia y comunicar mejor tu propuesta de valor.",
          badge: "CTRH0011",
          image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5",
        },
        {
          title: "Igualdad y no discriminación en el ámbito laboral",
          description: "Bases para desenvolverte en herramientas y dinamicas habituales del trabajo actual.",
          badge: "CTRI0001",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        },{
          title: "Inserción laboral y técnicas de búsqueda de empleo",
          description: "Claves para presentar tu perfil con confianza y responder con criterio.",
          badge: "FCOO01",
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
        },
        {
          title: "Recepción y atención al cliente en establecimiento de alojamiento",
          description: "Como ordenar tu experiencia y comunicar mejor tu propuesta de valor.",
          badge: "HOTA005PO",
          image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5",
        },
        {
          title: "Servicio de recepción, atención al cliente, facturación y caja",
          description: "Bases para desenvolverte en herramientas y dinamicas habituales del trabajo actual.",
          badge: "HOTA04",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        },
        {
          title: "Servicios básicos de sala en restauración",
          description: "Bases para desenvolverte en herramientas y dinamicas habituales del trabajo actual.",
          badge: "HOTR005PO",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        },
        {
          title: "Atención y procedimiento básicos en servicios de peluquería",
          description: "Bases para desenvolverte en herramientas y dinamicas habituales del trabajo actual.",
          badge: "IMPQ01",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        },
        {
          title: "Personal de control de accesos",
          description: "Bases para desenvolverte en herramientas y dinamicas habituales del trabajo actual.",
          badge: "SEAD0197",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        },
        {
          title: "Operaciones de lencería y lavandería de pisos ",
          description: "Bases para desenvolverte en herramientas y dinamicas habituales del trabajo actual.",
          badge: "HOTA11",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        },
        {
          title: "Atención al cliente en restauración",
          description: "Bases para desenvolverte en herramientas y dinamicas habituales del trabajo actual.",
          badge: "HOTR37",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        },
        {
          title: "Control de accesos",
          description: "Bases para desenvolverte en herramientas y dinamicas habituales del trabajo actual.",
          badge: "SEAD0004",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        },
        {
          title: "Tutorización de la formación práctica en los centros de trabajo",
          description: "Bases para desenvolverte en herramientas y dinamicas habituales del trabajo actual.",
          badge: "SSCE21",
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
          title: "Sensibilización en la igualdad de oportunidades",
          description: "Introduccion a principios y acciones para entornos mas justos e inclusivos.",
          badge: "FCOO02",
          image: "https://images.unsplash.com/photo-1522202220310-3d7c4b6b2b32",
        },
        {
          title: "Inserción laboral, sensibilización medioambiental y en la igualdad de género",
          description: "Recursos para detectar sesgos cotidianos y actuar con mas conciencia.",
          badge: "FCOO03",
          image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        },
        {
          title: "Igualdad de género en el ámbito laboral",
          description: "Buenas practicas para fomentar relaciones saludables en distintos contextos.",
          badge: "CTRI0015",
          image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
        },
        {
          title: "Persona de referencia en protocolos para la prevención de abordaje en acoso sexual y por razón de sexo",
          description: "Introduccion a principios y acciones para entornos mas justos e inclusivos.",
          badge: "CTRH0002",
          image: "https://images.unsplash.com/photo-1522202220310-3d7c4b6b2b32",
        },
        {
          title: "Igualdad y no discriminación en el ámbito laboral",
          description: "Recursos para detectar sesgos cotidianos y actuar con mas conciencia.",
          badge: "CTRI0001",
          image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        },
        {
          title: "Prevención de acoso sexual y por razón de sexo",
          description: "Buenas practicas para fomentar relaciones saludables en distintos contextos.",
          badge: "CTRI0002",
          image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
        },
        {
          title: "Elaboración e implementación de los planes de igualdad. Nivel inicial",
          description: "Introduccion a principios y acciones para entornos mas justos e inclusivos.",
          badge: "CTRI0004",
          image: "https://images.unsplash.com/photo-1522202220310-3d7c4b6b2b32",
        },
        {
          title: "Feminismo e interseccionalidad",
          description: "Recursos para detectar sesgos cotidianos y actuar con mas conciencia.",
          badge: "CTRI0006",
          image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
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
          title: "Competencias digitales básicas",
          description: "Uso basico de plataformas para comunicacion, documentos y trabajo compartido.",
          badge: "IFCT45",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        },
        {
          title: "Fundamentos tecnologías de información y comunicación",
          description: "Buenas practicas para proteger datos, cuentas y dispositivos.",
          badge: "ADGG026PO",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
        },
        {
          title: "Internet, redes sociales y dispositivos digitales",
          description: "Tecnicas para localizar, filtrar y aprovechar informacion fiable en internet.",
          badge: "ADGG040PO",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        },
        {
          title: "Office: word, excel, access y power point",
          description: "Uso basico de plataformas para comunicacion, documentos y trabajo compartido.",
          badge: "ADGG052PO",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        },
        {
          title: "Ofimática",
          description: "Buenas practicas para proteger datos, cuentas y dispositivos.",
          badge: "ADGG053PO",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
        },
        {
          title: "Inicialización en la informática y competencias digitales básicas para el empleo",
          description: "Tecnicas para localizar, filtrar y aprovechar informacion fiable en internet.",
          badge: "FC0I14",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        },
        {
          title: "Comunicación y colaboración con herramientas digitales nivel básico",
          description: "Tecnicas para localizar, filtrar y aprovechar informacion fiable en internet.",
          badge: "FCOI18",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        },
      ],
    },
  ],

///////////////////////////////////////////////////////////////////////////
//////                            EMPRESAS                           //////
///////////////////////////////////////////////////////////////////////////

  empresas: [

          /////////////////////////   INTERNO   ////////////////////// 

    {
      slug: "interno",
      title: "Interno",
      description: "Programas de desarrollo de personas, acompanamiento y crecimiento interno.",
      courses: [
        {
          title: "Mediación y resolución de conflictos",
          description: "Procesos para integrar nuevas incorporaciones con claridad y rapidez.",
          badge: "ADGD178PO",
          image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        },
        {
          title: "Atención al cliente y calidad de servicio",
          description: "Herramientas para detectar potencial y construir itinerarios de crecimiento.",
          badge: "COMM002PO",
          image: "https://images.unsplash.com/photo-1552581234-26160f608093",
        },
        {
          title: "Prevención de acoso sexual y por razón de sexo",
          description: "Enfoques para dar feedback util y favorecer la mejora continua.",
          badge: "CTRI0002",
          image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        },
      ],
    },

      /////////////////////////   HABILIDADES   ////////////////////// 


    {
      slug: "habilidades",
      title: "Habilidades",
      description: "Contenidos corporativos, normativos y de buenas practicas operativas.",
      courses: [
        {
          title: "Escucha activa, empatía y asertividad",
          description: "Panorama general de obligaciones y procedimientos internos esenciales.",
          badge: "ADGD096PO",
          image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
        },
        {
          title: "Gestión de las emociones",
          description: "Buenas practicas para el manejo responsable de informacion sensible.",
          badge: "ADGD123PO",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
        },
        {
          title: "Habilidades sociales de comunicación y resolución de conflictos en el centro de trabajo",
          description: "Uso correcto de procedimientos internos y circuitos de reporte.",
          badge: "ADGD151PO",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        },
        {
          title: "Habilidades de comunicación",
          description: "Uso correcto de procedimientos internos y circuitos de reporte.",
          badge: "FCOV_SOC02EXP",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        },
      ],
    },
      
    /////////////////////////   IGUALDADES   ////////////////////// 

    {
      slug: "igualdades",
      title: "Igualdades",
      description: "Iniciativas de inclusion, bienestar y cohesion organizativa.",
      courses: [
        {
          title: "Inserción laboral, sensibilización medioambiental y en la igualdad de género",
          description: "Acciones para reforzar el equilibrio, la motivacion y el clima interno.",
          badge: "FCOO03",
          image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        },
        {
          title: "Sensibilización en igualdad de oportunidades",
          description: "Practicas para mejorar la confianza, la coordinacion y el sentido de equipo.",
          badge: "FCOO02",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        },
        {
          title: "Igualdad de género en el ámbito laboral",
          description: "Bases para construir entornos de trabajo respetuosos y sostenibles.",
          badge: "CTRI0015",
          image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
        },
        {
          title: "Sensibilización LGTBI+ : Respetar ls diversidad sexual y prevenir la discriminación  social y laboral de personas LGTBI+",
          description: "Bases para construir entornos de trabajo respetuosos y sostenibles.",
          badge: "CTRI0014",
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