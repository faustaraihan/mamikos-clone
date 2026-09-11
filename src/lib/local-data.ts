export type Gender = "putra" | "putri" | "campur"
export type RentPeriod = "mingguan" | "bulanan" | "3-bulanan" | "6-bulanan" | "tahunan"
export type ListingKind = "kost" | "apartment"
export type AvailabilityStatus = "available" | "waitlist" | "full" | "hidden"
export type PriceDisplayMode = "regular" | "first-month"
export type LocationKind = "area" | "campus" | "station"

export interface Price {
  amount: number
  period: RentPeriod
  firstMonthAmount?: number
  options?: Partial<Record<RentPeriod, number>>
}

export interface Availability {
  availableRooms: number | null
  totalRooms: number | null
  waitlist: boolean
  count?: number | null
}

export interface Promo {
  label: string
  price: number
  originalPrice?: number
  periodLabel?: string
}

export interface Location {
  id: string
  slug: string
  label: string
  city: string
  district?: string
  kind: LocationKind
  listingCount: number
}

export interface GalleryItem {
  src: string
  alt: string
  isCover?: boolean
}

export interface RoomAmenities {
  room: string[]
  bathroom: string[]
  common: string[]
  parking: string[]
}

export interface RoomRules {
  room: string[]
  property: string[]
}

export interface RoomSpec {
  sizeM2: number
  bathroomType: "private" | "shared"
}

export interface PropertyInfo {
  name: string
  kind: ListingKind
}

export interface Room {
  id: string
  slug: string
  name: string
  kind: ListingKind
  locationId: string
  gender: Gender
  roomType: string
  price: Price
  availability: Availability
  rating: number | null
  reviewCount: number
  managedByMamikos: boolean
  promo?: Promo
  property: PropertyInfo
  roomSpec: RoomSpec
  gallery: GalleryItem[]
  amenities: RoomAmenities
  rules: RoomRules
}

export type Listing = Room

export interface ListingSection {
  id: string
  title: string
  subtitle?: string
  listingIds: string[]
}

const asset = "/assets/"
const roomPhotoAssets = [
  "homepage-9PyN2byp-240x320.jpg",
  "homepage-bnmmHslh-240x320.jpg",
  "homepage-DK2om4m5-240x320.jpg",
  "homepage-dLSgN3WF-240x320.jpg",
  "homepage-et2LwH4m-240x320.jpg",
  "homepage-i1FuPRj9.-240x320.jpg",
  "homepage-iAK2aBCK-240x320.jpg",
  "homepage-Jbg5R228-240x320.jpg",
  "homepage-ktwHC7Pq-240x320.jpg",
  "homepage-kWZTYlOQ-240x320.jpg",
  "homepage-oXJPUNAQ-240x320.jpg",
  "homepage-PwvdEGwL-240x320.jpg",
  "homepage-qLcTOgte-240x320.jpg",
  "homepage-r3xvoEqo-240x320.jpg",
  "homepage-sjZETjhg.-240x320.jpg",
  "homepage-U2nN1svp-240x320.jpg",
  "homepage-VnusA5Ay-240x320.jpg",
  "homepage-VPm4rgY5-240x320.jpg",
  "homepage-WEibRhg5-240x320.jpg",
  "homepage-WxIKX0EV-240x320.jpg",
  "homepage-y5EYmRpH-240x320.jpg",
  "homepage-YBUWMpLZ-240x320.jpg",
  "homepage-ygpUGYZ7-240x320.jpg",
  "homepage-zix8yNuY-240x320.jpg",
].map((filename) => asset + "rooms/" + filename)

export const locations: Location[] = [
  { id: "loc-jakarta", slug: "jakarta", label: "Jakarta Selatan", city: "Jakarta", district: "Kebayoran Baru", kind: "area", listingCount: 5 },
  { id: "loc-surabaya", slug: "surabaya", label: "Surabaya Timur", city: "Surabaya", district: "Tambaksari", kind: "area", listingCount: 3 },
  { id: "loc-bandung", slug: "bandung", label: "Bandung Utara", city: "Bandung", district: "Dago", kind: "area", listingCount: 2 },
  { id: "loc-depok", slug: "depok", label: "Sekitar UI Depok", city: "Depok", district: "Beji", kind: "campus", listingCount: 2 },
]

const locationIndex = new Map<string, Location>(locations.flatMap((location) => [
  [location.id, location],
  [location.slug, location],
]))

function makeGallery(roomId: string, roomName: string): GalleryItem[] {
  const offset = [...roomId].reduce((total, character) => total + character.charCodeAt(0), 0) % roomPhotoAssets.length
  return [0, 1, 2].map((index) => ({
    src: roomPhotoAssets[(offset + index) % roomPhotoAssets.length] ?? `${asset}placeholders/room-placeholder.svg`,
    alt: `${roomName} foto ${index + 1}`,
    isCover: index === 0,
  }))
}

type RoomSeed = Omit<Room, "property" | "roomSpec" | "gallery" | "amenities" | "rules"> & {
  amenities?: Partial<RoomAmenities>
  rules?: Partial<RoomRules>
  sizeM2?: number
  bathroomType?: RoomSpec["bathroomType"]
}

function makeRoom(seed: RoomSeed): Room {
  return {
    ...seed,
    property: { name: `${seed.name} Residence`, kind: seed.kind },
    roomSpec: { sizeM2: seed.sizeM2 ?? 16, bathroomType: seed.bathroomType ?? "shared" },
    gallery: makeGallery(seed.id, seed.name),
    amenities: {
      room: seed.amenities?.room ?? ["fan", "desk"],
      bathroom: seed.amenities?.bathroom ?? ["shared-bathroom"],
      common: seed.amenities?.common ?? ["wifi"],
      parking: seed.amenities?.parking ?? ["parking-motor"],
    },
    rules: {
      room: seed.rules?.room ?? ["no-smoking"],
      property: seed.rules?.property ?? ["quiet-hours"],
    },
  }
}

export const rooms: Room[] = [
  makeRoom({
    id: "room-harmoni-a",
    slug: "kost-harmoni-jakarta-a",
    name: "Kost Harmoni Jakarta Tipe A",
    kind: "kost",
    locationId: "loc-jakarta",
    gender: "putri",
    roomType: "Suite",
    price: { amount: 1_800_000, period: "bulanan", firstMonthAmount: 1_500_000 },
    availability: { availableRooms: 2, totalRooms: 12, waitlist: false },
    rating: 4.8,
    reviewCount: 24,
    managedByMamikos: true,
    promo: { label: "Promo Ngebut", price: 1_500_000, originalPrice: 1_800_000, periodLabel: "bulan pertama" },
    sizeM2: 22,
    bathroomType: "private",
    amenities: { room: ["ac", "wifi", "desk", "wardrobe"], bathroom: ["private-bathroom", "water-heater"], common: ["shared-kitchen", "laundry"], parking: ["parking-motor", "parking-car"] },
  }),
  makeRoom({
    id: "room-ceria-a",
    slug: "kost-ceria-jakarta-a",
    name: "Kost Ceria Jakarta Tipe A",
    kind: "kost",
    locationId: "loc-jakarta",
    gender: "campur",
    roomType: "Standard",
    price: { amount: 950_000, period: "bulanan" },
    availability: { availableRooms: 0, totalRooms: 8, waitlist: false },
    rating: null,
    reviewCount: 0,
    managedByMamikos: false,
  }),
  makeRoom({
    id: "room-senja-surabaya",
    slug: "kost-senja-surabaya-a",
    name: "Kost Senja Surabaya Tipe A",
    kind: "kost",
    locationId: "loc-surabaya",
    gender: "campur",
    roomType: "Standard Plus",
    price: { amount: 1_550_000, period: "bulanan", firstMonthAmount: 1_472_500 },
    availability: { availableRooms: 3, totalRooms: 10, waitlist: false },
    rating: 4.6,
    reviewCount: 13,
    managedByMamikos: true,
    promo: { label: "Diskon 5%", price: 1_472_500, originalPrice: 1_550_000, periodLabel: "bulan pertama" },
    sizeM2: 18,
    bathroomType: "private",
    amenities: { room: ["ac", "wifi", "desk"], bathroom: ["private-bathroom"], common: ["shared-kitchen", "laundry"], parking: ["parking-motor"] },
  }),
  makeRoom({
    id: "room-mentari-surabaya",
    slug: "kost-mentari-surabaya-a",
    name: "Kost Mentari Tambaksari",
    kind: "kost",
    locationId: "loc-surabaya",
    gender: "putri",
    roomType: "Standard",
    price: { amount: 1_350_000, period: "bulanan" },
    availability: { availableRooms: 4, totalRooms: 11, waitlist: false },
    rating: 4.5,
    reviewCount: 11,
    managedByMamikos: false,
    sizeM2: 16,
    bathroomType: "shared",
  }),
  makeRoom({
    id: "room-asri-bandung",
    slug: "kost-asri-bandung-a",
    name: "Kost Asri Dago Tipe A",
    kind: "kost",
    locationId: "loc-bandung",
    gender: "putra",
    roomType: "Premium",
    price: { amount: 1_925_000, period: "bulanan", firstMonthAmount: 1_754_000 },
    availability: { availableRooms: 3, totalRooms: 9, waitlist: false },
    rating: 4.7,
    reviewCount: 19,
    managedByMamikos: true,
    promo: { label: "Diskon 171rb", price: 1_754_000, originalPrice: 1_925_000, periodLabel: "bulan pertama" },
    sizeM2: 20,
    bathroomType: "private",
    amenities: { room: ["ac", "wifi", "desk", "wardrobe"], bathroom: ["private-bathroom", "water-heater"], common: ["gym", "shared-kitchen"], parking: ["parking-car"] },
  }),
  makeRoom({
    id: "room-bintang-surabaya",
    slug: "kost-bintang-surabaya-a",
    name: "Kost Bintang Tambaksari",
    kind: "kost",
    locationId: "loc-surabaya",
    gender: "campur",
    roomType: "Ekonomis",
    price: { amount: 1_400_000, period: "bulanan" },
    availability: { availableRooms: 1, totalRooms: 7, waitlist: false },
    rating: null,
    reviewCount: 0,
    managedByMamikos: false,
    sizeM2: 14,
    bathroomType: "shared",
  }),
  makeRoom({
    id: "room-nusa-jakarta",
    slug: "kost-nusa-jakarta-a",
    name: "Kost Nusa Tebet Tipe A",
    kind: "kost",
    locationId: "loc-jakarta",
    gender: "campur",
    roomType: "Deluxe",
    price: { amount: 2_250_000, period: "bulanan" },
    availability: { availableRooms: 2, totalRooms: 10, waitlist: false },
    rating: 4.4,
    reviewCount: 8,
    managedByMamikos: true,
    sizeM2: 19,
    bathroomType: "private",
    amenities: { room: ["ac", "wifi", "desk"], bathroom: ["private-bathroom"], common: ["shared-kitchen"], parking: ["parking-motor"] },
  }),
  makeRoom({
    id: "room-pelangi-depok",
    slug: "kost-pelangi-depok-a",
    name: "Kost Pelangi Dekat Kampus",
    kind: "kost",
    locationId: "loc-depok",
    gender: "putri",
    roomType: "Standard",
    price: { amount: 1_250_000, period: "bulanan", firstMonthAmount: 1_100_000 },
    availability: { availableRooms: 2, totalRooms: 8, waitlist: false },
    rating: 4.3,
    reviewCount: 7,
    managedByMamikos: true,
    promo: { label: "Promo Ngebut", price: 1_100_000, originalPrice: 1_250_000, periodLabel: "bulan pertama" },
    sizeM2: 15,
    bathroomType: "shared",
  }),
  makeRoom({
    id: "room-angkasa-depok",
    slug: "kost-angkasa-depok-a",
    name: "Kost Angkasa Beji",
    kind: "kost",
    locationId: "loc-depok",
    gender: "campur",
    roomType: "Standard Plus",
    price: { amount: 1_650_000, period: "bulanan" },
    availability: { availableRooms: 1, totalRooms: 6, waitlist: false },
    rating: 4.2,
    reviewCount: 5,
    managedByMamikos: false,
  }),
  makeRoom({
    id: "room-taman-bandung",
    slug: "kost-taman-bandung-a",
    name: "Kost Taman Dago",
    kind: "kost",
    locationId: "loc-bandung",
    gender: "campur",
    roomType: "Kamar AC",
    price: { amount: 1_700_000, period: "bulanan", firstMonthAmount: 1_550_000 },
    availability: { availableRooms: 3, totalRooms: 12, waitlist: false },
    rating: 4.6,
    reviewCount: 14,
    managedByMamikos: false,
    promo: { label: "Harga spesial", price: 1_550_000, originalPrice: 1_700_000, periodLabel: "bulan pertama" },
    sizeM2: 17,
    bathroomType: "private",
  }),
  makeRoom({
    id: "room-anggrek-waitlist",
    slug: "kost-anggrek-jakarta-b",
    name: "Kost Anggrek Tebet Tipe B",
    kind: "kost",
    locationId: "loc-jakarta",
    gender: "putri",
    roomType: "Standard",
    price: { amount: 1_050_000, period: "bulanan" },
    availability: { availableRooms: 0, totalRooms: 8, waitlist: true },
    rating: 4.1,
    reviewCount: 3,
    managedByMamikos: false,
  }),
  makeRoom({
    id: "room-cendana-hidden",
    slug: "kost-cendana-jakarta-a",
    name: "Kost Cendana Jakarta",
    kind: "kost",
    locationId: "loc-jakarta",
    gender: "campur",
    roomType: "Studio",
    price: { amount: 2_800_000, period: "bulanan" },
    availability: { availableRooms: null, totalRooms: null, waitlist: false },
    rating: 4.8,
    reviewCount: 16,
    managedByMamikos: true,
    sizeM2: 24,
    bathroomType: "private",
  }),
]

export const roomCatalog = rooms

const roomIndex = new Map<string, Room>(rooms.flatMap((room) => [
  [room.id, room],
  [room.slug, room],
]))

export const sections: ListingSection[] = [
  { id: "section-featured", title: "Rekomendasi kos", subtitle: "Pilihan kos sintetis untuk halaman utama.", listingIds: rooms.filter((room) => room.rating !== null).map((room) => room.id) },
  { id: "section-promo", title: "Promo Ngebut", subtitle: "Promo pilihan dari katalog lokal.", listingIds: rooms.filter((room) => Boolean(room.promo)).map((room) => room.id) },
  { id: "section-nearby", title: "Kos pilihan", subtitle: "Pilihan kos dari beberapa kota.", listingIds: rooms.slice(1, 7).map((room) => room.id) },
]

export const listingSections = sections

export function getRoomById(id: string | null | undefined): Room | undefined {
  const key = typeof id === "string" ? id.trim().toLowerCase() : ""
  return key ? roomIndex.get(key) : undefined
}

export function getLocationById(id: string | null | undefined): Location | undefined {
  const key = typeof id === "string" ? id.trim().toLowerCase() : ""
  return key ? locationIndex.get(key) : undefined
}

export function getPriceFrom(value: Price | Room, mode: PriceDisplayMode = "regular"): number {
  const price = "price" in value ? value.price : value
  return mode === "first-month" ? price.firstMonthAmount ?? ("price" in value ? value.promo?.price : undefined) ?? price.amount : price.amount
}

function availabilityOf(value: Availability | Room): Availability {
  return "availability" in value ? value.availability : value
}

export function getAvailabilityCount(value: Availability | Room): number | null {
  const availability = availabilityOf(value)
  return availability.count ?? availability.availableRooms
}

export function getAvailabilityStatus(value: Availability | Room): AvailabilityStatus {
  const count = getAvailabilityCount(value)
  if (count === null) return "hidden"
  if (count > 0) return "available"
  return availabilityOf(value).waitlist ? "waitlist" : "full"
}

export function getAvailabilityLabel(value: Availability | Room): string {
  const count = getAvailabilityCount(value)
  switch (getAvailabilityStatus(value)) {
    case "available":
      return `Tersedia ${count} kamar`
    case "waitlist":
      return "Daftar tunggu"
    case "full":
      return "Penuh"
    case "hidden":
      return "Ketersediaan belum tersedia"
  }
}

export function selectSection(sectionId: string | null | undefined): Room[] {
  const section = sections.find((item) => item.id === sectionId)
  if (!section) return []
  return section.listingIds.map((id) => getRoomById(id)).filter((room): room is Room => Boolean(room))
}

export const localRepository = {
  rooms,
  locations,
  sections,
  getRoom: getRoomById,
  getLocation: getLocationById,
  getPrice: getPriceFrom,
  getAvailabilityCount,
  getAvailabilityStatus,
  getAvailabilityLabel,
  section: selectSection,
}
