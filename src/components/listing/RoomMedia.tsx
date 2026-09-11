import type { ComponentProps } from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export const ROOM_FALLBACK_SRC = "/assets/placeholders/room-placeholder.svg"

export interface RoomMediaProps extends Omit<ComponentProps<"div">, "children"> {
  src?: string | null
  alt?: string
  fallbackSrc?: string
}

export function RoomMedia({
  src,
  alt = "Foto kamar",
  fallbackSrc = ROOM_FALLBACK_SRC,
  className,
  ...props
}: RoomMediaProps) {
  const [failed, setFailed] = useState(!src)
  const [fallbackFailed, setFallbackFailed] = useState(false)

  useEffect(() => {
    setFailed(!src)
    setFallbackFailed(false)
  }, [src, fallbackSrc])

  if (fallbackFailed) {
    return (
      <div
        {...props}
        data-slot="room-media"
        role="img"
        aria-label={`${alt}, tidak tersedia`}
        className={cn("relative flex h-full w-full items-center justify-center overflow-hidden bg-muted px-4 text-center text-xs text-muted-foreground", className)}
      >
        Foto tidak tersedia
      </div>
    )
  }

  return (
    <div {...props} data-slot="room-media" className={cn("relative h-full w-full overflow-hidden bg-muted", className)}>
      <img
        src={failed ? fallbackSrc : src ?? fallbackSrc}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        onError={() => {
          if (failed) setFallbackFailed(true)
          else setFailed(true)
        }}
      />
    </div>
  )
}
