import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import type { CourseCategory, CourseType } from "@/components/cursos/data"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type CourseGridProps = {
  type: CourseType
  eyebrow: string
  category: CourseCategory
}

export function CourseGrid({ type, eyebrow, category }: CourseGridProps) {
  return (
    <section className="mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:py-24">
      <div className="w-full">
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/frontend/cursos/${type}`}
            className={cn(buttonVariants({ variant: "ghost" }), "rounded-xl px-3 text-sm")}
          >
            <ChevronLeft className="size-4" />
            Volver a {eyebrow.toLowerCase()}
          </Link>
          <Link
            href="/frontend/cursos"
            className={cn(buttonVariants({ variant: "ghost" }), "rounded-xl px-3 text-sm")}
          >
            <ChevronLeft className="size-4" />
            Inicio de cursos
          </Link>
        </div>

        <div className="mx-auto mt-8 max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {category.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            {category.description}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {category.courses.map((course) => (
            <Card
              key={course.title}
              className="h-full rounded-3xl border border-border/70 bg-background shadow-sm"
            >
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-xl font-semibold">{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-sm leading-7 text-muted-foreground">{course.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
