"use client"

import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import { getMessages } from "@/lib/i18n/messages"
import { cn } from "@/lib/utils"

export default function Section3() {
  const { language } = useLanguage()
  const copy = getMessages(language).home.section3

  return (
    <section className="w-full bg-background px-6 py-24 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="relative aspect-[1.02/1] w-full max-w-[460px] justify-self-start overflow-hidden rounded-[36px] bg-[#f6f7fb] shadow-[0_18px_40px_rgba(17,17,17,0.08)]">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
              alt={copy.peopleImageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col items-start text-left lg:pl-4">
            <h2 className="font-sans text-[64px] font-extrabold leading-none tracking-[-0.055em] text-[#E05780] sm:text-[76px] lg:text-[90px]">
              {copy.peopleTitle}
            </h2>
            <p className="mt-3 font-sans text-[34px] font-normal leading-none tracking-[-0.07em] text-[#75A5E3] sm:text-[40px] lg:text-[48px]">
              {copy.peopleSubtitle}
            </p>
            <p className="mt-8 max-w-[54ch] font-[family:var(--font-body)] text-[18px] font-normal leading-8 text-black/65">
              {copy.peopleDescription}
            </p>
            <Link
              href="/frontend/cursos/personas"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "mt-8 h-9 rounded-xl bg-[#75A5E3] px-4 text-[14px] font-medium text-white hover:bg-[#6796d2]"
              )}
            >
              {copy.more}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16">
          <div className="flex flex-col items-start text-left lg:items-end lg:text-right lg:pr-4">
            <h2 className="font-sans text-[64px] font-extrabold leading-none tracking-[-0.055em] text-[#E05780] sm:text-[76px] lg:text-[90px]">
              {copy.companiesTitle}
            </h2>
            <p className="mt-3 font-sans text-[34px] font-normal leading-none tracking-[-0.07em] text-[#75A5E3] sm:text-[40px] lg:text-[48px]">
              {copy.companiesSubtitle}
            </p>
            <p className="mt-8 max-w-[54ch] font-[family:var(--font-body)] text-[18px] font-normal leading-8 text-black/65">
              {copy.companiesDescription}
            </p>
            <Link
              href="/frontend/cursos/empresas"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "mt-8 h-9 rounded-xl bg-[#75A5E3] px-4 text-[14px] font-medium text-white hover:bg-[#6796d2]"
              )}
            >
              {copy.more}
            </Link>
          </div>

          <div className="relative aspect-[1.02/1] w-full max-w-[460px] justify-self-start overflow-hidden rounded-[36px] bg-[#f6f7fb] shadow-[0_18px_40px_rgba(17,17,17,0.08)] lg:justify-self-end">
            <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80"
              alt={copy.companiesImageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
