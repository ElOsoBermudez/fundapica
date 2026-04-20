import type { ContentModule } from "@/components/backoffice/dashboard/types"

export const contentModules: ContentModule[] = [
  {
    id: "news",
    title: "Noticias",
    description: "Comunicados, actividades, convocatorias y novedades institucionales.",
    action: "Abrir noticias",
    summary:
      "La sección de noticias debe resolver la comunicación inmediata del centro: novedades claras, visuales consistentes y una fecha visible para que cada publicación tenga contexto desde el primer vistazo.",
    focus:
      "Pensada para piezas breves, actuales y con intención informativa. Ideal para actividades, anuncios oficiales y comunicación con familias o comunidad educativa.",
    workflow: [
      "Definir titular, entradilla, fecha y estado editorial antes de maquetar el cuerpo de la noticia.",
      "Preparar una imagen principal reconocible y mantener una línea visual consistente entre publicaciones.",
      "Cerrar cada pieza con un enlace útil, una llamada a la acción o una referencia al programa relacionado.",
    ],
    publicHref: "/frontend",
  },
  {
    id: "blog",
    title: "Blog",
    description: "Artículos con más profundidad, reflexión y contenido de valor.",
    action: "Abrir blog",
    summary:
      "El blog puede reunir entrevistas, guías, recursos y contenidos de apoyo con un tono más pausado que las noticias. Conviene tratarlo como una biblioteca de piezas que sigan teniendo sentido con el paso del tiempo.",
    focus:
      "Úsalo para desarrollar temas con más contexto, reforzar la identidad del proyecto y mejorar la presencia editorial del sitio.",
    workflow: [
      "Trabajar estructura larga con autoría, fecha, bloques visuales y subtítulos que faciliten la lectura.",
      "Mantener una apertura clara y un cierre con idea principal, recurso descargable o siguiente lectura sugerida.",
      "Revisar tono, ortografía y coherencia antes de enviar una pieza a publicación.",
    ],
    publicHref: "/frontend",
  },
  {
    id: "courses",
    title: "Cursos",
    description: "Oferta formativa, fichas de programa y contenidos asociados a cada curso.",
    action: "Abrir cursos",
    summary:
      "Esta zona debe servir para presentar la oferta formativa de forma ordenada: qué se imparte, para quién está pensado, cuál es la propuesta de valor y cómo se accede a cada programa.",
    focus:
      "Aquí conviene unir contenido informativo con materiales útiles: temario resumido, fechas, recursos descargables y llamadas a inscripción o contacto.",
    workflow: [
      "Separar ficha general del curso, temario destacado, documentación complementaria y recursos visuales.",
      "Mantener visibles modalidad, duración, público objetivo y estado de convocatoria cuando aplique.",
      "Preparar materiales descargables y contenidos asociados desde la biblioteca media para no duplicar archivos.",
    ],
    publicHref: "/frontend",
  },
]
