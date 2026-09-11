import { useEffect, useState } from "react"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { PageContainer } from "@/components/AppShell"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const promoSlides = [
  {
    src: "/assets/promotions/carousel-promo-8.webp",
    alt: "Promo Ngebut untuk kos dekat kampus pilihan",
  },
  {
    src: "/assets/promotions/carousel-promo-9.webp",
    alt: "Kos Life Balance Padel dan Tennis Tourney",
  },
  {
    src: "/assets/promotions/carousel-promo-3.webp",
    alt: "Promo kos nyaman di Bali",
  },
  {
    src: "/assets/promotions/carousel-promo-1.jpg",
    alt: "Promo Singgahsini Apik dengan jaminan uang kembali",
  },
  {
    src: "/assets/promotions/carousel-promo-4.jpg",
    alt: "Promo voucher kos dari Kos Andalan",
  },
  {
    src: "/assets/promotions/carousel-promo-5.webp",
    alt: "Promo starterpack untuk pengalaman ngekos nyaman",
  },
] as const

function CitySkyline() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 720 280"
      className="h-auto w-full text-[#e9edef]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
        <path d="M8 246h704" />
        <path d="M25 246v-48h37v48M36 198v-17h16v17M69 246v-83h46v83M78 163v-26h28v26M124 246v-63h42v63M134 183v-16h23v16" />
        <path d="M178 246v-109h40v109M186 137v-28h24v28M225 246v-61h50v61M235 185v-19h30v19" />
        <path d="M285 246v-145h52v145M296 101v-31h30v31M355 246v-84h43v84M366 162v-28h22v28" />
        <path d="M417 246v-116h45v116M428 130v-31h23v31M480 246v-67h53v67M492 179v-21h29v21" />
        <path d="M550 246v-150h42v150M560 96V62h22v34M609 246v-91h46v91M620 155v-26h25v26" />
        <path d="M674 246v-62h30v62M680 184v-18h18v18" />
        <path d="M308 70l13-24 13 24M568 62l13-27 13 27" />
      </g>
      <g fill="currentColor" opacity="0.55">
        <path d="M66 61c0-9 8-16 17-16 5-10 21-13 29-2 11-4 24 4 24 16H66Z" />
        <path d="M411 40c0-9 8-16 17-16 5-10 21-13 29-2 11-4 24 4 24 16h-70Z" />
        <path d="M596 91c0-9 8-16 17-16 5-10 21-13 29-2 11-4 24 4 24 16h-70Z" />
      </g>
      <g stroke="currentColor" strokeWidth="2" opacity="0.65">
        <path d="M81 177h31M81 190h31M81 203h31M81 216h31" />
        <path d="M188 149h21M188 163h21M188 177h21M188 191h21M188 205h21M188 219h21" />
        <path d="M297 118h28M297 132h28M297 146h28M297 160h28M297 174h28M297 188h28M297 202h28M297 216h28" />
        <path d="M429 151h21M429 165h21M429 179h21M429 193h21M429 207h21M429 221h21" />
        <path d="M561 112h21M561 126h21M561 140h21M561 154h21M561 168h21M561 182h21M561 196h21M561 210h21" />
        <path d="M622 177h20M622 191h20M622 205h20M622 219h20" />
      </g>
    </svg>
  )
}

function PromoCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(1)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!api) return

    const updateActiveIndex = () => setActiveIndex(api.selectedScrollSnap())
    updateActiveIndex()
    api.on("select", updateActiveIndex)
    return () => {
      api.off("select", updateActiveIndex)
    }
  }, [api])

  useEffect(() => {
    if (!api || paused) return

    const timer = window.setInterval(() => api.scrollNext(), 5000)
    return () => window.clearInterval(timer)
  }, [api, paused])

  return (
    <section
      aria-label="Promo Mamikos"
      className="-mx-4 mt-6 overflow-hidden pb-10 sm:-mx-6 sm:mt-8 sm:pb-14 lg:-mx-8 lg:mt-0"
    >
      <Carousel
        aria-label="Carousel promo Mamikos"
        className="mx-auto w-full max-w-[1280px]"
        onBlur={(event) => {
          const nextFocus = event.relatedTarget
          if (!(nextFocus instanceof Node) || !event.currentTarget.contains(nextFocus)) setPaused(false)
        }}
        onFocus={() => setPaused(true)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        opts={{ align: "center", loop: true, startIndex: 1 }}
        setApi={setApi}
      >
        <CarouselContent className="-ml-4 px-4 md:-ml-6 md:px-0">
          {promoSlides.map((slide) => (
            <CarouselItem
              key={slide.src}
              className="basis-[82vw] max-w-[680px] md:basis-[52vw] md:pl-6 lg:basis-[680px]"
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="block aspect-[2.36] w-full rounded-lg object-cover shadow-sm"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-5 flex items-center justify-center gap-5">
          <CarouselPrevious className="!static !left-auto !top-auto !size-10 !translate-x-0 !translate-y-0" />
          <div aria-label="Posisi promo" className="flex items-center gap-2" role="tablist">
            {promoSlides.map((slide, index) => (
              <Button
                key={slide.src}
                aria-label={`Tampilkan promo ${index + 1}`}
                aria-selected={activeIndex === index}
                className={cn(
                  "!size-2 cursor-pointer rounded-full p-0",
                  activeIndex === index ? "!bg-primary" : "!bg-border hover:!bg-primary/60",
                )}
                onClick={() => api?.scrollTo(index)}
                role="tab"
                size="icon-xs"
                type="button"
                variant="ghost"
              />
            ))}
          </div>
          <CarouselNext className="!static !right-auto !top-auto !size-10 !translate-x-0 !translate-y-0" />
        </div>
      </Carousel>
    </section>
  )
}

function InformationCards() {
  return (
    <div className="grid gap-5 pb-12 lg:grid-cols-2">
      <article className="relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#303b4a]">Survei Kos Idaman Kamu Sekarang!</h2>
        <p className="mt-3 leading-7 text-[#303b4a]">
          Cari, pilih, survei, hingga sewa kos idaman dengan aman dan gratis.
        </p>
        <a className="mt-5 inline-block text-sm font-semibold underline underline-offset-4" href="https://mamikos.com">
          Baca selengkapnya
        </a>
        <span aria-hidden="true" className="absolute -bottom-8 -right-8 size-32 rounded-full bg-primary/10" />
      </article>
      <article className="flex flex-col justify-between gap-5 rounded-xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-[#303b4a]">Kos Dikelola Mamikos, Terjamin Nyaman</h2>
          <p className="mt-3 leading-7 text-[#303b4a]">Lokasi terverifikasi dan bangunan kos telah lolos seleksi.</p>
        </div>
        <div aria-label="Singgahsini dan Apik" className="flex shrink-0 items-center gap-5">
          <img src="/assets/brand/ic_singgahsini_full.svg" alt="Singgahsini" className="h-10 w-auto" />
          <img src="/assets/brand/ic_apik_full.svg" alt="Apik" className="h-10 w-auto" />
        </div>
      </article>
    </div>
  )
}

export function HomeHero() {
  return (
    <section aria-labelledby="home-hero-title" className="bg-white">
      <PageContainer className="pt-4 sm:pt-6 lg:pt-6">
        <div className="grid min-h-0 items-center gap-8 lg:min-h-[220px] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
          <div className="relative z-10 max-w-[540px]">
            <h1 id="home-hero-title" className="text-2xl font-bold tracking-tight text-[#303b4a] sm:text-3xl">
              Mau cari kos?
            </h1>
            <p className="mt-2 text-base leading-7 text-[#303b4a] sm:text-lg">
              Dapatkan infonya dan langsung sewa di Mamikos.
            </p>
            <button
              id="home-search"
              type="button"
              aria-disabled="true"
              aria-label="Pencarian hanya tersedia di versi lengkap"
              onClick={(event) => event.preventDefault()}
              className={cn(
                "mt-5 flex h-12 w-full max-w-[460px] cursor-pointer items-center justify-between border border-input bg-white p-1 text-left shadow-[0_4px_14px_rgba(37,51,65,0.12)] hover:bg-white sm:h-14",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
            >
              <span className="flex min-w-0 items-center gap-2">
                <MagnifyingGlassIcon aria-hidden="true" className="ml-1 size-6 shrink-0" />
                <span className="min-w-0 truncate px-1 text-base font-semibold text-muted-foreground">Masukan nama lokasi/area/alamat</span>
              </span>
              <span className="flex h-full shrink-0 items-center rounded-md bg-primary px-3 text-xs font-bold text-white sm:px-4 sm:text-sm">Cari</span>
            </button>
          </div>
          <div className="hidden self-end lg:block">
            <CitySkyline />
          </div>
        </div>
        <PromoCarousel />
        <InformationCards />
      </PageContainer>
    </section>
  )
}
