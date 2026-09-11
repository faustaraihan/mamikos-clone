import { useId, useState } from "react"
import { getLocationById, type Room } from "@/lib/local-data"
import { Button } from "@/components/ui/Button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/Carousel"
import { Combobox, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger, ComboboxValue } from "@/components/ui/Combobox"
import { PromoRoomCard } from "./PromoRoomCard"

export function RoomListSection({ title, rooms }: { title: string; rooms: Room[] }) {
  const id = useId()
  const [city, setCity] = useState("")
  const cities = [...new Set(rooms.map((room) => getLocationById(room.locationId)?.city).filter((value): value is string => Boolean(value)))]
  const visible = rooms.filter((room) => !city || getLocationById(room.locationId)?.city === city)
  return (
    <section aria-labelledby={id} className="pb-14">
      <Carousel key={city} opts={{ align: "start", slidesToScroll: "auto" }} aria-label={title}>
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 id={id} className="text-2xl font-bold sm:text-3xl">{title}</h2>
            <Combobox value={city || null} onValueChange={(value) => setCity(typeof value === "string" ? value : "")}>
              <ComboboxTrigger aria-label={`Pilih kota ${title.toLowerCase()}`} className="text-2xl font-bold sm:text-3xl" onKeyDown={(event) => event.stopPropagation()}>
                <ComboboxValue placeholder="Semua Kota" />
              </ComboboxTrigger>
              <ComboboxPopup>
                <ComboboxList>
                  <ComboboxItem value="">Semua Kota</ComboboxItem>
                  {cities.map((value) => <ComboboxItem key={value} value={value}>{value}</ComboboxItem>)}
                </ComboboxList>
              </ComboboxPopup>
            </Combobox>
          </div>
          <div className="flex items-center gap-4">
            <Button type="button" aria-disabled="true" onClick={(event) => event.preventDefault()} variant="outline" className="h-10 cursor-pointer rounded px-5 !bg-white hover:!bg-muted">Lihat semua</Button>
            <div className="flex gap-3 border-l pl-4">
              <CarouselPrevious className="!static !size-10 !translate-y-0 !bg-white shadow-sm hover:!bg-muted" />
              <CarouselNext className="!static !size-10 !translate-y-0 !bg-white shadow-sm hover:!bg-muted" />
            </div>
          </div>
        </div>
        {visible.length ? <CarouselContent className="-ml-6 py-1">
          {visible.map((room) => <CarouselItem key={room.id} className="basis-[85%] pl-6 sm:basis-1/2 lg:basis-1/4"><PromoRoomCard room={room} /></CarouselItem>)}
        </CarouselContent> : <p role="status" className="py-8 text-muted-foreground">Belum ada kos promo di kota ini.</p>}
      </Carousel>
    </section>
  )
}
