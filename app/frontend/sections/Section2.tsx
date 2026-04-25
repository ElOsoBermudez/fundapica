"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"
import { getMessages } from "@/lib/i18n/messages"

const sections = [
  {
    title: "Compromiso",
    description:
      "Acompañamos el desarrollo personal con formación práctica y cercana para mejorar la empleabilidad.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Cursos",
    description:
      "Acompañamos el desarrollo con formación práctica y cercana para mejorar la empleabilidad.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Oportunidad",
    description:
      "Impulsamos formación conectada al mercado laboral para crecer profesionalmente.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80",
  },
]

export default function Section2() {
  const { language } = useLanguage()
  const copy = getMessages(language).home.section2

  return (
    <section className="w-full bg-white px-6 py-24 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-14 flex flex-col items-center gap-4 text-center sm:mb-16">
          <span className="h-1 w-18 rounded-full bg-[#E05780]" aria-hidden="true" />
          <h2 className="mb-6 font-sans text-6xl font-extrabold tracking-[-0.055em] text-[#E05780] underline decoration-[0.08em] underline-offset-[0.16em] sm:text-7xl lg:text-[90px]">
            {copy.title}
          </h2>
          <p className="max-w-5xl font-[family:var(--font-body)] text-[18px] font-normal leading-7 text-black/65">
            {copy.intro}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {sections.map((section, index) => (
            <div key={section.title} className="flex flex-col items-center text-center">
              <div className="relative mb-8 h-52 w-52 overflow-hidden rounded-full border border-black/10 bg-[#f8fafc] shadow-[0_10px_30px_rgba(17,17,17,0.06)] sm:h-56 sm:w-56">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  sizes="(max-width: 768px) 208px, 224px"
                  className="object-cover"
                />
              </div>
              <h3 className="mb-4 font-sans text-[40px] font-normal text-[#75A5E3] sm:text-[44px] lg:text-[48px]">
                {copy.cards[index]?.title ?? section.title}
              </h3>
              <p className="line-clamp-3 max-w-[32ch] font-[family:var(--font-body)] text-[18px] font-normal leading-7 text-black/65">
                {copy.cards[index]?.description ?? section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
