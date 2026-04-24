import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import type { CourseCategory, CourseType } from "@/components/cursos/data"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "rounded-xl px-3 text-sm text-[#75A5E3] hover:text-[#E05780]"
            )}
          >
            <ChevronLeft className="size-4" />
            Volver a {eyebrow.toLowerCase()}
          </Link>
          <Link
            href="/frontend/cursos"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "rounded-xl px-3 text-sm text-[#75A5E3] hover:text-[#E05780]"
            )}
          >
            <ChevronLeft className="size-4" />
            Inicio de cursos
          </Link>
        </div>

        <div className="mx-auto mt-8 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#75A5E3]">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-sans text-6xl font-extrabold tracking-[-0.055em] text-[#E05780] sm:text-7xl lg:text-[90px]">
            {category.title}
          </h1>
          <p className="mt-5 font-[family:var(--font-body)] text-[18px] leading-7 text-black/65 sm:text-[20px]">
            {category.description}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {category.courses.map((course) => {
            const imageSrc =
              course.image ??
              `https://placehold.co/960x600/e5e7eb/111827?text=${encodeURIComponent(course.title)}`
            const imageAlt = `Imagen de apoyo para el curso ${course.title}`
            const badge = course.badge ?? category.title

            return (
              <Card
                key={course.title}
                className="h-full rounded-[1.75rem] border border-black/8 bg-white pt-0 shadow-[0_10px_30px_rgba(17,17,17,0.06)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F8FAFC]">
                  <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" />
                </div>
                <CardHeader className="gap-2 px-5 pt-5">
                  <div className="mb-1">
                    <Badge className="rounded-full border-0 bg-[#EAFCFC] px-3 py-1 text-[11px] uppercase text-[#75A5E3]">
                      {badge}
                    </Badge>
                  </div>
                  <CardTitle className="font-sans text-2xl font-bold tracking-[-0.04em] text-[#E05780]">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="font-[family:var(--font-body)] text-sm leading-6 text-black/60">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto justify-start border-t border-black/8 bg-white px-5 py-4">
                  <Link
                    href={`/frontend/cursos/${type}/${category.slug}/${course.id}`}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "rounded-xl bg-[#75A5E3] text-white hover:bg-[#6796d2]"
                    )}
                  >
                    Ver curso
                    <ChevronRight className="size-4" />
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
