"use client"

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
import { useLanguage } from "@/lib/i18n/language-context"
import { getMessages } from "@/lib/i18n/messages"
import { cn } from "@/lib/utils"

export function CoursesHeroSelector() {
  const { language } = useLanguage()
  const copy = getMessages(language).courses
  const localizedAudiences = courseAudiences.map((audience) => {
    const localized = copy.audiences[audience.type]
    return {
      ...audience,
      title: localized.title,
      description: localized.description,
      points: localized.points,
      buttonLabel: localized.buttonLabel,
    }
  })

  return (
    <section className="mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#75A5E3]">
          {copy.hero.eyebrow}
        </p>
        <h1 className="mt-4 font-sans text-5xl font-extrabold tracking-[-0.055em] text-[#E05780] sm:text-6xl lg:text-7xl">
          {copy.hero.title}
        </h1>
        <p className="mt-5 font-[family:var(--font-body)] text-[18px] leading-7 text-black/65 sm:text-[20px]">
          {copy.hero.description}
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {localizedAudiences.map((audience) => {
          const Icon = audience.icon

          return (
            <Card
              key={audience.type}
              className="rounded-[2rem] border border-black/8 bg-white shadow-[0_10px_30px_rgba(17,17,17,0.06)]"
            >
              <CardHeader className="gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-[#EAFCFC] text-[#75A5E3] ring-1 ring-[#75A5E3]/15">
                  <Icon className="size-7" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="font-sans text-3xl font-bold tracking-[-0.04em] text-[#E05780]">
                    {audience.title}
                  </CardTitle>
                  <CardDescription className="max-w-xl font-[family:var(--font-body)] text-base leading-6 text-black/65">
                    {audience.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-2 sm:px-8">
                <ul className="space-y-3">
                  {audience.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 font-[family:var(--font-body)] text-sm leading-6 text-black/60"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EAFCFC] text-[#75A5E3]">
                        <Check className="size-3.5" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="mt-auto border-t border-black/8 bg-white px-6 py-5 sm:px-8">
                <Link
                  href={`/frontend/cursos/${audience.type}`}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full justify-center rounded-xl bg-[#75A5E3] text-white hover:bg-[#6796d2] sm:w-auto"
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
