import { LightningBoltIcon, StarFilledIcon } from "@radix-ui/react-icons"
import { getAvailabilityCount, getAvailabilityLabel, getAvailabilityStatus, getLocationById, getPriceFrom, type Room } from "@/lib/local-data"
import { getFacilityLabels } from "./FacilityChips"
import { RoomMedia } from "./RoomMedia"

const currency = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })
const formatRoomPrice = (amount: number) => currency.format(amount)

export function PromoRoomCard({ room }: { room: Room }) {
  const cover = room.gallery.find((image) => image.isCover) ?? room.gallery[0]
  const location = getLocationById(room.locationId)
  const price = room.promo?.price ?? getPriceFrom(room)
  const original = room.promo?.originalPrice ?? getPriceFrom(room)
  const facilities = getFacilityLabels(room, 8).join(" · ")

  return (
    <article className="block min-w-0 cursor-pointer rounded-lg text-foreground" aria-label={`Kartu ${room.name}`}>
      <div className="relative aspect-[5/3] overflow-hidden rounded-lg border">
        <RoomMedia src={cover?.src} alt={cover?.alt ?? room.name} />
        {room.managedByMamikos ? <img src="/assets/icons/badges/icon-singgahsini.svg" alt="Dikelola Mamikos" className="absolute left-0 top-0 size-7 rounded-br-lg bg-white p-1" /> : null}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
        <span className="rounded border px-2 py-0.5">{{ putra: "Putra", putri: "Putri", campur: "Campur" }[room.gender]}</span>
        {room.rating !== null ? <span className="flex items-center gap-1 font-semibold"><StarFilledIcon className="size-4 text-primary" aria-hidden="true" />{room.rating.toFixed(1)}</span> : null}
        <span className="text-xs italic text-red-600">{getAvailabilityStatus(room) === "available" ? `Sisa ${getAvailabilityCount(room)} kamar` : getAvailabilityLabel(room)}</span>
      </div>
      <h3 className="mt-2 truncate text-sm leading-5" title={room.name}>{room.name}</h3>
      <p className="truncate text-sm font-semibold">{location?.district ?? location?.label ?? "Lokasi belum tersedia"}</p>
      <p className="mt-1 truncate text-xs text-muted-foreground" title={facilities}>{facilities}</p>
      {original > price ? <p className="mt-2 flex flex-wrap items-center gap-1 text-sm"><span className="inline-flex items-center font-semibold text-red-600"><LightningBoltIcon aria-hidden="true" />Diskon {formatRoomPrice(original - price)}</span><del className="text-muted-foreground">{formatRoomPrice(original)}</del></p> : null}
      <p className="mt-1 text-sm"><strong className="text-base">{formatRoomPrice(price)}</strong> ({room.promo?.periodLabel ?? room.price.period})</p>
    </article>
  )
}
