"use client"

import Image from "next/image"
import { BrainCircuit, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { getMessages } from "@/lib/i18n/messages"

export default function SectionCourseAssistant() {
  const { language } = useLanguage()
  const copy = getMessages(language).home.assistant
  const features = [
    {
      title: copy.features[0].title,
      description: copy.features[0].description,
      icon: BrainCircuit,
    },
    {
      title: copy.features[1].title,
      description: copy.features[1].description,
      icon: Sparkles,
    },
  ]

  return (
    <section className="w-full bg-white px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
            alt={copy.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="max-w-[12ch] font-sans text-4xl font-extrabold tracking-[-0.04em] text-[#E05780] sm:text-5xl lg:text-6xl">
            {copy.title}
          </h2>

          <p className="mt-5 max-w-xl font-[family:var(--font-body)] text-base leading-7 text-black/60 sm:text-lg">
            {copy.description}
          </p>

          <div className="mt-8 space-y-6">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAFCFC] text-[#75A5E3]">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#75A5E3]">{feature.title}</h3>
                    <p className="mt-1 font-[family:var(--font-body)] text-sm leading-6 text-black/60">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-10">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-[#F3F0FF] px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#e9e3ff]"
            >
              💬 {copy.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
