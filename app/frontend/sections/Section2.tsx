const cards = [
  { title: "Compromiso" },
  { title: "Cursos" },
  { title: "Oportunidad" },
]

export default function Section2() {
  return (
    <section className="w-full bg-white px-6 py-24 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-14 flex flex-col items-center gap-4 text-center sm:mb-16">
          <span className="h-1 w-18 rounded-full bg-[#E05780]" aria-hidden="true" />
          <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
            ¿Quiénes somos?
          </h2>
          <p className="max-w-2xl text-base leading-7 text-black/60 sm:text-lg">
            Placeholder para una breve descripción de la sección.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col items-center rounded-[24px] border border-black/5 bg-white p-7 text-center shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
            >
              <div className="mb-6 aspect-[16/10] w-full rounded-[18px] border border-dashed border-black/15 bg-[#f4f7fb]" />
              <h3 className="mb-3 text-2xl font-bold text-black">{card.title}</h3>
              <p className="text-base leading-7 text-black/60">
                Placeholder para texto descriptivo.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
