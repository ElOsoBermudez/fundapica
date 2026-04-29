"use client"

import SlideTextButton from "@/components/kokonutui/slide-text-button"
import { useLanguage } from "@/lib/i18n/language-context"
import { getMessages } from "@/lib/i18n/messages"

export default function Section1() {
  const { language } = useLanguage()
  const copy = getMessages(language).home.section1

  return (
    <section
      className="relative min-h-[600px] w-full min-w-[1200px] overflow-hidden bg-background"
      style={{ height: "calc(100svh - 4rem)" }}
    >
      {/* Image strictly confined to the right 50% of the viewport — never crosses the centerline */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/background-home.webp')",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      {/* Text content inside 1200px container, left 50% only */}
      <div className="relative mx-auto flex h-full w-full max-w-[1200px]">
        <div className="flex w-1/2 items-start pt-16 sm:pt-20 lg:pt-24 xl:pt-28">
          <div className="w-full max-w-[32rem] space-y-6 pl-6 sm:pl-8 lg:pl-10">
            <h1
              className="max-w-[10ch] font-bold text-[#0a0a0a] sm:text-5xl lg:text-6xl xl:text-[4.75rem] 2xl:text-[6rem]"
              style={{ lineHeight: "0.8em", letterSpacing: "-0.03em", fontSize: "7.4em" }}
            >
              <span className="block whitespace-nowrap">
                {copy.titleLines.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < copy.titleLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </span>
            </h1>
            <p className="text-2xl font-medium text-[#75A5E3] sm:text-3xl lg:text-4xl">
              {copy.subtitle}
            </p>
            <SlideTextButton
              href="/frontend/cursos"
              text={copy.cta}
              className="mt-24 !min-w-0 bg-[#E05780] text-[#fafafa] hover:bg-[#d14d74]"
            />
          </div>
        </div>
        <div className="w-1/2" aria-hidden="true" />
      </div>
    </section>
  )
}
