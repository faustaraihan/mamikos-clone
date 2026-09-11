import type { ComponentProps } from "react";
import type { Room } from "@/data/local-data";
import { cn } from "@/lib/utils";

const FACILITY_LABELS: Record<string, string> = {
  ac: "AC",
  fan: "Kipas",
  wifi: "Wi-Fi",
  desk: "Meja",
  wardrobe: "Lemari",
  "private-bathroom": "Kamar mandi dalam",
  "shared-bathroom": "Kamar mandi bersama",
  "water-heater": "Water heater",
  "shared-kitchen": "Dapur bersama",
  laundry: "Laundry",
  gym: "Gym",
  "parking-motor": "Parkir motor",
  "parking-car": "Parkir mobil",
};

function labelForFacility(value: string): string {
  return (
    FACILITY_LABELS[value] ??
    value
      .replaceAll("-", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
}

export function getFacilityLabels(
  room: Pick<Room, "amenities">,
  limit = 3,
): string[] {
  const safeLimit = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : 3;
  const values = [
    room.amenities.room,
    room.amenities.bathroom,
    room.amenities.common,
    room.amenities.parking,
  ]
    .flat()
    .filter((value): value is string => Boolean(value));

  return [...new Set(values)].map(labelForFacility).slice(0, safeLimit);
}

export interface FacilityChipsProps extends Omit<
  ComponentProps<"ul">,
  "children"
> {
  room: Pick<Room, "amenities">;
  limit?: number;
}

export function FacilityChips({
  room,
  limit = 3,
  className,
  ...props
}: FacilityChipsProps) {
  const labels = getFacilityLabels(room, limit);
  if (!labels.length) return null;

  return (
    <ul
      {...props}
      aria-label="Fasilitas"
      className={cn("flex min-w-0 flex-wrap gap-1.5", className)}
    >
      {labels.map((label) => (
        <li
          key={label}
          className="max-w-full truncate rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
          title={label}
        >
          {label}
        </li>
      ))}
    </ul>
  );
}
