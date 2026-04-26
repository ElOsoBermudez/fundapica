import type { ContentModule } from "@/components/backoffice/dashboard/types"

export const contentModules: ContentModule[] = [
  {
    id: "news",
    title: "Noticias",
    description: "Comunicados, actividades y novedades del centro.",
    action: "Abrir noticias",
    summary:
      "La seccion de noticias debe resolver la comunicacion inmediata del centro con piezas claras, fecha visible y una presentacion consistente.",
    focus:
      "Pensada para publicaciones breves, actuales y faciles de localizar.",
    workflow: [
      "Definir titular, fecha y categoria antes de redactar el cuerpo.",
      "Mantener una imagen principal clara y reconocible.",
      "Cerrar cada noticia con un enlace util o una accion concreta.",
    ],
    publicHref: "/frontend",
  },
  {
    id: "blog",
    title: "Blog",
    description: "Articulos con mas contexto y contenido de valor.",
    action: "Abrir blog",
    summary:
      "El blog sirve para desarrollar temas con mas profundidad y reforzar la linea editorial del sitio.",
    focus:
      "Ideal para entrevistas, recursos, guias y contenidos que siguen vigentes con el tiempo.",
    workflow: [
      "Trabajar una estructura clara con subtitulos y bloques visuales.",
      "Mantener una apertura directa y un cierre con idea principal.",
      "Revisar tono, ortografia y coherencia antes de publicar.",
    ],
    publicHref: "/frontend",
  },
  {
    id: "courses",
    title: "Cursos",
    description: "Oferta formativa, fichas y materiales asociados.",
    action: "Abrir cursos",
    summary:
      "Esta zona presenta la oferta formativa de forma ordenada para que cada curso se entienda rapido.",
    focus:
      "Conviene mostrar modalidad, publico, fechas y recursos utiles sin recargar la ficha.",
    workflow: [
      "Separar ficha general, temario y documentacion complementaria.",
      "Mantener visibles modalidad, duracion y estado de convocatoria.",
      "Preparar materiales y tareas con una planificacion clara para no duplicar trabajo.",
    ],
    publicHref: "/frontend",
  },
]
