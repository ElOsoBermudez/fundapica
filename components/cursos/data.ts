import { BriefcaseBusiness, Users, type LucideIcon } from "lucide-react"

export type CourseType = "personas" | "empresas"

export type CourseItem = {
  id: string
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

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

export const courseAudiences: CourseAudience[] = [
  {
    type: "personas",
    icon: Users,
    title: "Personas",
    description: "Formacion practica para mejorar habilidades, empleabilidad y crecimiento profesional.",
    points: [
      "Categorias pensadas para perfiles y objetivos distintos",
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
      "Areas para equipos, liderazgo y cultura organizativa",
      "Planes adaptables a objetivos de negocio y desarrollo interno",
      "Base clara para escalar a soluciones corporativas a medida",
    ],
    buttonLabel: "Ver cursos para empresas",
  },
]
