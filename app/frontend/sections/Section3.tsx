import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Section3() {
  return (
    <section className="w-full bg-white px-6 py-24 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div
            className="aspect-[1.02/1] w-full max-w-[460px] justify-self-start rounded-[36px] bg-[#f6f7fb]"
            aria-hidden="true"
          />

          <div className="flex flex-col items-start text-left lg:pl-4">
            <h2 className="font-sans text-[64px] font-extrabold leading-none tracking-[-0.055em] text-[#E05780] sm:text-[76px] lg:text-[90px]">
              Personas
            </h2>
            <p className="mt-3 font-sans text-[34px] font-normal leading-none tracking-[-0.07em] text-[#75A5E3] sm:text-[40px] lg:text-[48px]">
              Formación pensada para crecer
            </p>
            <p className="mt-8 max-w-[54ch] font-[family:var(--font-body)] text-[18px] font-normal leading-8 text-black/65">
              Creamos itinerarios formativos cercanos y prácticos para acompañar a cada
              persona en su desarrollo profesional, reforzar sus competencias y abrir nuevas
              oportunidades dentro del mundo laboral.
            </p>
            <Link
              href="/frontend/cursos/personas"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "mt-8 h-9 rounded-xl bg-[#75A5E3] px-4 text-[14px] font-medium text-white hover:bg-[#6796d2]"
              )}
            >
              Saber más
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16">
          <div className="flex flex-col items-start text-left lg:items-end lg:text-right lg:pr-4">
            <h2 className="font-sans text-[64px] font-extrabold leading-none tracking-[-0.055em] text-[#E05780] sm:text-[76px] lg:text-[90px]">
              Empresas
            </h2>
            <p className="mt-3 font-sans text-[34px] font-normal leading-none tracking-[-0.07em] text-[#75A5E3] sm:text-[40px] lg:text-[48px]">
              Formación para impulsar tu organización
            </p>
            <p className="mt-8 max-w-[54ch] font-[family:var(--font-body)] text-[18px] font-normal leading-8 text-black/65">
              Diseñamos formación práctica y adaptada a las necesidades de cada empresa para
              fortalecer equipos, mejorar sus competencias y aumentar su impacto en el entorno
              laboral y en los resultados del negocio.
            </p>
            <Link
              href="/frontend/cursos/empresas"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "mt-8 h-9 rounded-xl bg-[#75A5E3] px-4 text-[14px] font-medium text-white hover:bg-[#6796d2]"
              )}
            >
              Saber más
            </Link>
          </div>

          <div
            className="aspect-[1.02/1] w-full max-w-[460px] justify-self-start rounded-[36px] bg-[#f6f7fb] lg:justify-self-end"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
