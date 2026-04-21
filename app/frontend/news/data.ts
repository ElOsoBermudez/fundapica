import { NewsCategory, NewsItem } from "./types"

export const newsItems: NewsItem[] = [
  {
    id: "programas-empleo-joven-digital",
    title: "Nuevos programas de empleo joven impulsan perfiles digitales con practicas remuneradas",
    description:
      "Entidades sociales y empresas tecnológicas amplían itinerarios de inserción laboral para personas jóvenes con formación en soporte, web y datos.",
    content: [
      "Varias organizaciones han puesto en marcha nuevas rutas de inserción laboral para jóvenes que quieren dar el salto al sector digital. Los itinerarios combinan orientación, formación técnica y prácticas en empresas con acompañamiento individual.",
      "Los perfiles más demandados siguen siendo soporte técnico, administración básica de sistemas, gestión de contenidos, testing y análisis de datos. Las entidades participantes destacan que el seguimiento personalizado mejora la permanencia y la empleabilidad.",
      "Además de la capacitación técnica, los programas incorporan habilidades transversales como comunicación profesional, trabajo en equipo y preparación de entrevistas para facilitar una incorporación más estable al mercado laboral.",
    ],
    category: "Insercion laboral",
    image:
      "https://picsum.photos/seed/insercion-laboral-digital/1200/800",
    publishedAt: "2026-04-21T08:30:00.000Z",
    author: "Lucia Ortega",
    featured: true,
  },
  {
    id: "ciberseguridad-basica-pymes-sociales",
    title: "La ciberseguridad basica gana peso en pymes y entidades del tercer sector",
    description:
      "Crece la demanda de perfiles capaces de configurar copias de seguridad, accesos seguros y buenas prácticas digitales en equipos pequeños.",
    content: [
      "Pequeñas empresas y entidades sociales están reforzando sus medidas de seguridad ante el aumento de intentos de phishing, robo de credenciales y pérdida de información.",
      "Esto está generando oportunidades para perfiles junior de informática con conocimientos en contraseñas seguras, gestión de usuarios, copias de seguridad, actualizaciones y protección de dispositivos.",
      "Los equipos valoran especialmente a quienes pueden traducir conceptos técnicos a lenguaje claro y ayudar a implantar hábitos digitales sostenibles dentro de la organización.",
    ],
    category: "Informatica",
    image:
      "https://picsum.photos/seed/ciberseguridad-pymes/1200/800",
    publishedAt: "2026-04-21T07:10:00.000Z",
    author: "Marina Soler",
  },
  {
    id: "empresas-refuerzan-diversidad-lgtbiq",
    title: "Más empresas refuerzan sus planes de diversidad e inclusión LGTBIQ+ en el entorno laboral",
    description:
      "Recursos humanos incorpora formación interna, protocolos contra la discriminación y redes de apoyo para mejorar el clima laboral.",
    content: [
      "Cada vez más compañías revisan sus políticas internas para garantizar entornos laborales más seguros y visibles para profesionales LGTBIQ+.",
      "Entre las medidas más frecuentes destacan los protocolos frente a situaciones de discriminación, la actualización del lenguaje corporativo y la creación de grupos de afinidad y mentoría.",
      "Especialistas en inclusión recuerdan que la visibilidad debe ir acompañada de medidas concretas de acceso, permanencia y promoción para generar un impacto real en la vida laboral.",
    ],
    category: "LGTBIQ+",
    image:
      "https://picsum.photos/seed/diversidad-lgtbiq-empresa/1200/800",
    publishedAt: "2026-04-20T18:45:00.000Z",
    author: "Daniel Ferrer",
  },
  {
    id: "bootcamps-soporte-desarrollo-accesibles",
    title: "Bootcamps accesibles abren nuevas puertas a soporte tecnico y desarrollo web",
    description:
      "Centros de formación y fundaciones ofrecen becas para personas en búsqueda de empleo interesadas en comenzar una carrera tecnológica.",
    content: [
      "La oferta formativa en soporte técnico, administración web y desarrollo frontend sigue creciendo con formatos más flexibles y becados.",
      "Muchas convocatorias incluyen acompañamiento para crear portafolio, revisar currículum y entrenar entrevistas con foco en la inserción laboral real.",
      "El acceso a itinerarios más prácticos está permitiendo que personas con trayectorias diversas puedan reorientarse hacia empleos tecnológicos con barreras de entrada más asumibles.",
    ],
    category: "Formacion",
    image:
      "https://picsum.photos/seed/bootcamp-tecnologia-becas/1200/800",
    publishedAt: "2026-04-20T14:20:00.000Z",
    author: "Nora Vidal",
  },
  {
    id: "redes-comunitarias-acceso-tecnologia",
    title: "Redes comunitarias acercan recursos tecnológicos a personas en búsqueda activa de empleo",
    description:
      "Espacios vecinales y asociaciones comparten equipos, talleres y mentoría digital para reducir brechas de acceso.",
    content: [
      "En distintos barrios y municipios se están consolidando redes de apoyo que facilitan acceso a ordenadores, conexión, formación básica y orientación laboral.",
      "Estas iniciativas permiten preparar candidaturas, aprender herramientas digitales y resolver barreras cotidianas que dificultan la búsqueda de empleo.",
      "Las entidades participantes subrayan que el componente comunitario resulta clave para sostener los procesos formativos y evitar el aislamiento de las personas participantes.",
    ],
    category: "Comunidad",
    image:
      "https://picsum.photos/seed/redes-comunitarias-empleo/1200/800",
    publishedAt: "2026-04-19T16:05:00.000Z",
    author: "Pablo Reyes",
  },
  {
    id: "talento-trans-sector-digital",
    title: "El sector digital amplía iniciativas para acompañar talento trans en el acceso al empleo",
    description:
      "Programas específicos de mentoría y alianzas con empresas buscan reducir barreras y mejorar la contratación inclusiva.",
    content: [
      "Diversas iniciativas especializadas están conectando a personas trans con formación tecnológica, asesoramiento laboral y empresas comprometidas con políticas de contratación inclusivas.",
      "Los programas suelen combinar mentoría profesional, revisión de perfiles, simulación de entrevistas y acompañamiento durante los primeros meses de incorporación.",
      "Entidades y activistas recuerdan que la empleabilidad mejora cuando la inclusión no depende solo de campañas puntuales, sino de políticas sostenidas y equipos preparados.",
    ],
    category: "LGTBIQ+",
    image:
      "https://picsum.photos/seed/talento-trans-tecnologia/1200/800",
    publishedAt: "2026-04-19T11:40:00.000Z",
    author: "Clara Mena",
  },
]

export const newsCategories: NewsCategory[] = [
  "All",
  "Insercion laboral",
  "Informatica",
  "LGTBIQ+",
  "Formacion",
  "Comunidad",
]
