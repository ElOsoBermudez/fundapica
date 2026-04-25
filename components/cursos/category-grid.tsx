"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import type { CourseCategory, CourseType } from "@/components/cursos/data"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import { getMessages } from "@/lib/i18n/messages"
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
  const { language } = useLanguage()
  const messages = getMessages(language)
  const copy = messages.courses.common
  const audienceLabel =
    language === "ca" ? messages.courses.audiences[type].title : eyebrow
  const localizedSubtitle =
    language === "ca" ? messages.courses.listings[type] : subtitle

  return (
    <section className="mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:py-24">
      <div className="w-full">
        <Link
          href="/frontend/cursos"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "mb-8 inline-flex rounded-xl px-3 text-sm text-[#75A5E3] hover:text-[#E05780]"
          )}
        >
          <ChevronLeft className="size-4" />
          {copy.back}
        </Link>

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#75A5E3]">
            {audienceLabel}
          </p>
          <h1 className="mt-4 font-sans text-6xl font-extrabold tracking-[-0.055em] text-[#E05780] sm:text-7xl lg:text-[90px]">
            {copy.categoriesTitle}
          </h1>
          <p className="mt-5 font-[family:var(--font-body)] text-[18px] leading-7 text-black/65 sm:text-[20px]">
            {localizedSubtitle}
          </p>
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
                "h-full rounded-[1.75rem] border border-black/8 bg-white shadow-[0_10px_30px_rgba(17,17,17,0.06)]",
                categories.length >= 3 && "xl:col-span-2",
                categories.length === 5 && index === 3 && "xl:col-start-2",
                categories.length === 5 && index === 4 && "xl:col-start-4"
              )}
            >
              <CardHeader className="px-6 pt-6">
                <CardTitle className="font-sans text-[32px] font-bold tracking-[-0.04em] text-[#E05780]">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="font-[family:var(--font-body)] text-sm leading-6 text-black/60">
                  {category.description}
                </p>
              </CardContent>
              <CardFooter className="mt-auto justify-start border-t border-black/8 bg-white px-6 py-5">
                <Link
                  href={`/frontend/cursos/${type}/${category.slug}`}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-xl bg-[#75A5E3] text-white hover:bg-[#6796d2]"
                  )}
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
