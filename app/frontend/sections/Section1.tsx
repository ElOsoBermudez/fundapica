export default function Section1() {
  return (
    <section
      className="h-screen min-h-[600px] w-screen min-w-[1200px] overflow-hidden bg-white"
      style={{
        backgroundImage: "url('/background-home.webp')",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto 100%",
      }}
    >
      <div className="flex h-full w-full">
        <div className="flex w-1/2 items-start px-8 pt-24 sm:px-12 sm:pt-28 lg:px-16 lg:pt-32 xl:px-20 xl:pt-36">
          <h1 className="max-w-[8ch] text-4xl font-bold leading-[0.95] text-[#E05780] sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[6rem]">
            Formación personalizada para llegar más lejos
          </h1>
        </div>
        <div className="w-1/2" aria-hidden="true" />
      </div>
    </section>
  )
}
