import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"

import { courseAudiences } from "@/components/cursos/data"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function CoursesHeroSelector() {
  return (
    <section className="mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">Oferta formativa</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Cursos
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Selecciona el itinerario que mejor encaja contigo y navega por categorias y cursos
          desde una arquitectura limpia y escalable.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {courseAudiences.map((audience) => {
          const Icon = audience.icon

          return (
            <Card
              key={audience.type}
              className="rounded-3xl border border-border/70 bg-background/95 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)]"
            >
              <CardHeader className="gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Icon className="size-7" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-semibold">{audience.title}</CardTitle>
                  <CardDescription className="max-w-xl text-base leading-7">
                    {audience.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-2 sm:px-8">
                <ul className="space-y-3">
                  {audience.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
                        <Check className="size-3.5" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="mt-auto border-t border-border/60 bg-muted/30 px-6 py-5 sm:px-8">
                <Link
                  href={`/frontend/cursos/${audience.type}`}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full justify-center rounded-xl sm:w-auto"
                  )}
                >
                  {audience.buttonLabel}
                  <ChevronRight className="size-4" />
                </Link>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
