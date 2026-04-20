const sections = [
  {
    title: "Compromiso",
    description:
      "Acompañamos el desarrollo personal con formación práctica y cercana para mejorar la empleabilidad."
  },
  {
    title: "Cursos",
    description:
      "Acompañamos el desarrollo con formación práctica y cercana para mejorar la empleabilidad.",
  },
  {
    title: "Oportunidad",
    description:
      "Impulsamos formación conectada al mercado laboral para crecer profesionalmente."
  },
]

export default function Section2() {
  return (
    <section className="w-full bg-white px-6 py-24 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-14 flex flex-col items-center gap-4 text-center sm:mb-16">
          <span className="h-1 w-18 rounded-full bg-[#E05780]" aria-hidden="true" />
          <h2 className="mb-6 font-sans text-6xl font-extrabold tracking-[-0.055em] text-[#E05780] underline decoration-[0.08em] underline-offset-[0.16em] sm:text-7xl lg:text-[90px]">
            ¿Quiénes somos?
          </h2>
          <p className="max-w-5xl font-[family:var(--font-body)] text-[18px] font-normal leading-7 text-black/65">
            En la Academia de Entrenamiento Danna Zenon somos una institucion
            comprometida con el desarrollo del talento y la empleabilidad.
            Disenamos y ejecutamos programas de formacion adaptados a las
            necesidades de empresas y personas que buscan una oportunidad de trabajo.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col items-center text-center">
              <div
                className="mb-8 h-52 w-52 rounded-full border border-dashed border-black/15 bg-[#f8fafc] sm:h-56 sm:w-56"
                aria-hidden="true"
              />
              <h3 className="mb-4 font-sans text-[40px] font-normal text-[#75A5E3] sm:text-[44px] lg:text-[48px]">
                {section.title}
              </h3>
              <p className="line-clamp-3 max-w-[32ch] font-[family:var(--font-body)] text-[18px] font-normal leading-7 text-black/65">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
