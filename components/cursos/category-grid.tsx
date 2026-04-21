import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import type { CourseCategory, CourseType } from "@/components/cursos/data"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type CategoryGridProps = {
  type: CourseType
  eyebrow: string
  subtitle: string
  categories: CourseCategory[]
}

export function CourseCategoryGrid({
  type,
  eyebrow,
  subtitle,
  categories,
}: CategoryGridProps) {
  return (
    <section className="mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:py-24">
      <div className="w-full">
        <Link
          href="/frontend/cursos"
          className={cn(buttonVariants({ variant: "ghost" }), "mb-8 inline-flex rounded-xl px-3 text-sm")}
        >
          <ChevronLeft className="size-4" />
          Volver
        </Link>

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Categorias
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{subtitle}</p>
        </div>

        <div
          className={cn(
            "mt-14 grid gap-6",
            categories.length >= 3 ? "md:grid-cols-2 xl:grid-cols-6" : "md:grid-cols-2"
          )}
        >
          {categories.map((category, index) => (
            <Card
              key={category.slug}
              className={cn(
                "h-full rounded-3xl border border-border/70 bg-background shadow-sm",
                categories.length >= 3 && "xl:col-span-2",
                categories.length === 5 && index === 3 && "xl:col-start-2",
                categories.length === 5 && index === 4 && "xl:col-start-4"
              )}
            >
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-xl font-semibold">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-sm leading-6 text-muted-foreground">{category.description}</p>
              </CardContent>
              <CardFooter className="mt-auto justify-start border-t border-border/60 bg-background px-6 py-5">
                <Link
                  href={`/frontend/cursos/${type}/${category.slug}`}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-xl")}
                >
                  Ver cursos
                  <ChevronRight className="size-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
