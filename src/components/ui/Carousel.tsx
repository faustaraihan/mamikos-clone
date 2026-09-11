import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

export type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: UseEmblaCarouselType[0]
  api: CarouselApi
  orientation: "horizontal" | "vertical"
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error("useCarousel must be used within a <Carousel>")
  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  plugins,
  setApi,
  className,
  onKeyDown,
  ...props
}: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    plugins,
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback(
    (currentApi: CarouselApi) => {
      if (!currentApi) return
      setCanScrollPrev(currentApi.canScrollPrev())
      setCanScrollNext(currentApi.canScrollNext())
      setApi?.(currentApi)
    },
    [setApi],
  )

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented) return

      const previousKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp"
      const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown"
      if (event.key === previousKey) {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === nextKey) {
        event.preventDefault()
        scrollNext()
      }
    },
    [onKeyDown, orientation, scrollNext, scrollPrev],
  )

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)
    return () => {
      api.off("reInit", onSelect)
      api.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        aria-roledescription="carousel"
        className={cn("relative", className)}
        onKeyDown={handleKeyDown}
        role="region"
        {...props}
      />
    </CarouselContext.Provider>
  )
}

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CarouselContent({ className, ...props }, ref) {
    const { carouselRef, orientation } = useCarousel()
    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn("flex", orientation === "horizontal" ? "flex-row" : "flex-col", className)}
          {...props}
        />
      </div>
    )
  },
)
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CarouselItem({ className, ...props }, ref) {
    const { orientation } = useCarousel()
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className,
        )}
        {...props}
      />
    )
  },
)
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  function CarouselPrevious({ className, onClick, variant = "outline", size = "icon", ...props }, ref) {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel()
    return (
      <Button
        {...props}
        ref={ref}
        aria-label="Promo sebelumnya"
        className={cn(
          "absolute size-8 cursor-pointer rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) scrollPrev()
        }}
        size={size}
        variant={variant}
      >
        <ChevronLeftIcon aria-hidden="true" />
        <span className="sr-only">Promo sebelumnya</span>
      </Button>
    )
  },
)
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  function CarouselNext({ className, onClick, variant = "outline", size = "icon", ...props }, ref) {
    const { orientation, scrollNext, canScrollNext } = useCarousel()
    return (
      <Button
        {...props}
        ref={ref}
        aria-label="Promo berikutnya"
        className={cn(
          "absolute size-8 cursor-pointer rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) scrollNext()
        }}
        size={size}
        variant={variant}
      >
        <ChevronRightIcon aria-hidden="true" />
        <span className="sr-only">Promo berikutnya</span>
      </Button>
    )
  },
)
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious }
