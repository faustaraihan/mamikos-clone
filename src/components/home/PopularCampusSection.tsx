import { ArrowRightIcon } from "@radix-ui/react-icons"

const popularCampuses = [
  { name: "UGM", city: "Jogja", image: "/assets/campuses/UGM.png" },
  { name: "UNDIP", city: "Semarang", image: "/assets/campuses/UNDIP.png" },
  { name: "UI", city: "Depok", image: "/assets/campuses/UI.png" },
  { name: "UNPAD", city: "Jatinangor", image: "/assets/campuses/UNPAD.png" },
  { name: "STAN", city: "Jakarta", image: "/assets/campuses/STAN.png" },
  { name: "UB", city: "Malang", image: "/assets/campuses/UB.png" },
  { name: "UNAIR", city: "Surabaya", image: "/assets/campuses/UNAIR.png" },
] as const

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

export function PopularCampusSection() {
  return (
    <section aria-labelledby="popular-campus-title" className="pb-14">
      <h2 id="popular-campus-title" className="text-2xl font-bold sm:text-3xl">Kos Sekitar Kampus</h2>
      <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
        {popularCampuses.map((campus) => (
          <button
            key={campus.name}
            type="button"
            aria-disabled="true"
            onClick={(event) => event.preventDefault()}
            className={`${focusRing} flex h-[68px] w-full cursor-pointer items-center gap-2 rounded-lg border border-[#dbdbdb] bg-white px-3 text-left transition-shadow hover:shadow-[0_1px_8px_rgba(153,153,153,0.2),0_3px_4px_rgba(153,153,153,0.12)] md:h-[104px] md:gap-6 md:px-5`}
          >
            <span className="flex size-8 shrink-0 items-center justify-center md:size-[52px]">
              <img src={campus.image} alt={`${campus.name} logo`} className="max-h-full max-w-full object-contain" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-bold leading-5 md:leading-6">{campus.name}</span>
              <span className="mt-1 block truncate text-base leading-5 md:mt-2 md:leading-6">{campus.city}</span>
            </span>
          </button>
        ))}
        <button
          type="button"
          aria-disabled="true"
          onClick={(event) => event.preventDefault()}
          className={`${focusRing} flex h-[68px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#dbdbdb] bg-white px-3 text-base font-bold transition-shadow hover:shadow-[0_1px_8px_rgba(153,153,153,0.2),0_3px_4px_rgba(153,153,153,0.12)] md:h-[104px] md:px-5 md:text-lg`}
        >
          <span>Lihat semua</span>
          <ArrowRightIcon aria-hidden="true" className="size-5" />
        </button>
      </div>
    </section>
  )
}
