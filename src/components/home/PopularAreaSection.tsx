import { ArrowRightIcon } from "@radix-ui/react-icons"

const popularAreas = [
  { city: "Yogyakarta", image: "/assets/areas/jogja.png" },
  { city: "Jakarta", image: "/assets/areas/jakarta.png" },
  { city: "Bandung", image: "/assets/areas/bandung.png" },
  { city: "Surabaya", image: "/assets/areas/surabaya.png" },
  { city: "Malang", image: "/assets/areas/malang.png" },
  { city: "Semarang", image: "/assets/areas/semarang.png" },
  { city: "Medan", image: "/assets/areas/medan.png" },
] as const

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

export function PopularAreaSection() {
  return (
    <section aria-labelledby="popular-area-title" className="pb-14">
      <h2 id="popular-area-title" className="text-2xl font-bold sm:text-3xl">Area Kos Terpopuler</h2>
      <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
        {popularAreas.map((area) => (
          <button
            key={area.city}
            type="button"
            aria-disabled="true"
            onClick={(event) => event.preventDefault()}
            className={`${focusRing} group relative isolate flex w-full cursor-pointer aspect-[4/3] min-h-[118px] items-center justify-center overflow-hidden rounded-lg bg-muted text-base shadow-[0_4px_24px_rgba(0,0,0,0.1)] md:h-[200px] md:min-h-0 md:aspect-auto md:text-2xl`}
          >
            <img src={area.image} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <span aria-hidden="true" className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" />
            <span className="relative px-3 text-center font-bold text-white">Kos {area.city}</span>
          </button>
        ))}
        <button
          type="button"
          aria-disabled="true"
          onClick={(event) => event.preventDefault()}
          className={`${focusRing} flex aspect-[4/3] min-h-[118px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-4 text-center text-base font-bold text-foreground shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition-colors hover:bg-muted md:h-[200px] md:min-h-0 md:aspect-auto md:text-2xl`}
        >
          <span>Lihat semua</span>
          <ArrowRightIcon aria-hidden="true" className="size-5 md:size-6" />
        </button>
      </div>
    </section>
  )
}
