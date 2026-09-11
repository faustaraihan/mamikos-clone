import {
  getAvailabilityLabel,
  getAvailabilityStatus,
  getLocationById,
  getPriceFrom,
  getRoomById,
  rooms,
  selectSection,
} from "./local-data.js"

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

assert(rooms.length >= 10, "homepage catalog should include enough local cards")
assert(getRoomById("kost-harmoni-jakarta-a")?.id === "room-harmoni-a", "room slug should resolve")
assert(getLocationById("jakarta")?.city === "Jakarta", "location slug should resolve")
assert(getAvailabilityStatus(getRoomById("room-harmoni-a")!) === "available", "available status should derive from room count")
assert(getAvailabilityLabel(getRoomById("room-anggrek-waitlist")!) === "Daftar tunggu", "waitlist label should be explicit")
assert(getAvailabilityStatus(getRoomById("room-ceria-a")!) === "full", "full status should derive from zero rooms")
assert(getAvailabilityStatus(getRoomById("room-cendana-hidden")!) === "hidden", "unknown availability should stay hidden")
assert(getPriceFrom(getRoomById("room-harmoni-a")!, "first-month") === 1_500_000, "promo price should be used for first month")
assert(selectSection("section-promo").every((room) => Boolean(room.promo)), "promo section should contain promo rooms")
assert(selectSection("missing-section").length === 0, "unknown homepage section should be safe")

console.log("homepage local-data self-check: ok")
