import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react"
import {
  ChatBubbleIcon,
  ChevronDownIcon,
  EnvelopeClosedIcon,
  HamburgerMenuIcon,
  InstagramLogoIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/Dialog"

const asset = "/assets/"
const focus = "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
const linkStyle = focus + " hover:underline underline-offset-4"
type MenuItem = { label: string; icon?: string }

const propertyMenuItems: MenuItem[] = [
  { label: "Kos", icon: "icons/navigation/basic-bed.svg" },
  { label: "Kos Singgahsini & Apik", icon: "icons/badges/icon-singgahsini.svg" },
  { label: "Kos Andalan", icon: "icons/badges/icon-kos-andalan.svg" },
  { label: "Apartemen", icon: "icons/navigation/basic-apartment.svg" },
  { label: "Jual-Beli Properti", icon: "icons/navigation/basic-home-front-view.svg" },
]

const moreMenuItems: MenuItem[] = [
  { label: "Pusat Bantuan" },
  { label: "Blog Mamikos" },
  { label: "Syarat dan Ketentuan" },
]

export function PageContainer({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />
}

function PlaceholderNavButton({ label, notification = false }: { label: string; notification?: boolean }) {
  return (
    <button
      type="button"
      aria-disabled="true"
      className={cn(focus, "relative inline-flex h-full cursor-pointer items-center whitespace-nowrap px-1 py-2 text-base font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:rounded-t after:bg-primary after:opacity-0 after:transition-opacity hover:after:opacity-100 focus-visible:after:opacity-100")}
      onClick={(event) => event.preventDefault()}
    >
      {label}
      {notification ? <span aria-hidden="true" className="absolute right-0.5 top-1 size-2 rounded-full bg-destructive" /> : null}
    </button>
  )
}

function PlaceholderMenu({ label, items }: { label: string; items: MenuItem[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative h-full"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
      onFocus={() => setOpen(true)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(focus, "relative flex h-full cursor-pointer items-center gap-1 whitespace-nowrap px-1 py-2 text-base font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:rounded-t after:bg-primary after:opacity-0 after:transition-opacity hover:after:opacity-100 focus-visible:after:opacity-100", open ? "after:opacity-100" : "")}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <ChevronDownIcon aria-hidden="true" className="size-4" />
      </button>
      <div
        className={cn(
          "absolute right-0 top-full z-50 mt-2 w-60 rounded-md border bg-white p-3 shadow-[0_4px_16px_rgba(0,0,0,0.12)] before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-['']",
          items.some((item) => item.icon) && "w-80",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        role="menu"
      >
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            role="menuitem"
            aria-disabled="true"
            className={cn(focus, "flex w-full cursor-pointer items-center gap-4 rounded-sm px-3 py-2 text-left text-base hover:bg-muted", item.icon ? "font-semibold" : "font-normal")}
            onClick={(event) => event.preventDefault()}
          >
            {item.icon ? <img src={asset + item.icon} alt="" width="24" height="24" className="size-6 shrink-0 object-contain" /> : null}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function MobileNavigationSheet({
  open,
  onOpenChange,
  finalFocus,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  finalFocus: ComponentProps<typeof DialogContent>["finalFocus"]
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        finalFocus={finalFocus}
        aria-labelledby="mobile-navigation-title"
        className="!fixed !inset-y-0 !right-0 !left-auto !top-0 !flex !h-dvh !w-[min(22rem,calc(100%-1rem))] !max-w-none !translate-x-0 !translate-y-0 !gap-0 !overflow-hidden !rounded-none !rounded-l-2xl !p-0 data-open:animate-in data-open:slide-in-from-right data-closed:animate-out data-closed:slide-out-to-right"
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="border-b px-5 pb-5 pt-6 pr-14">
            <DialogTitle id="mobile-navigation-title" className="text-xl font-bold">Menu Mamikos</DialogTitle>
            <DialogDescription className="mt-1">Pilih menu yang ingin kamu buka.</DialogDescription>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            <button type="button" aria-disabled="true" onClick={(event) => { event.preventDefault(); onOpenChange(false) }} className={cn(focus, "flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-left text-base font-semibold hover:bg-muted")}>
              <img src={asset + "icons/navigation/ic_profile.svg"} width="40" height="40" alt="" className="size-10 shrink-0" />
              <span>Profil</span>
            </button>

            <div className="mt-4 border-t pt-4">
              <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Cari Apa?</p>
              <div className="space-y-1">
                {propertyMenuItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    aria-disabled="true"
                    className={cn(focus, "flex w-full cursor-pointer items-center gap-4 rounded-md px-3 py-3 text-left text-base font-semibold hover:bg-muted")}
                    onClick={(event) => { event.preventDefault(); onOpenChange(false) }}
                  >
                    {item.icon ? <img src={asset + item.icon} alt="" width="24" height="24" className="size-6 shrink-0 object-contain" /> : null}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="space-y-1">
                {["Favorit", "Chat", "Notifikasi"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    aria-disabled="true"
                    className={cn(focus, "flex w-full cursor-pointer items-center rounded-md px-3 py-3 text-left text-base font-semibold hover:bg-muted")}
                    onClick={(event) => { event.preventDefault(); onOpenChange(false) }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Lainnya</p>
              <div className="space-y-1">
                {moreMenuItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    aria-disabled="true"
                    className={cn(focus, "flex w-full cursor-pointer items-center rounded-md px-3 py-3 text-left text-base font-normal hover:bg-muted")}
                    onClick={(event) => { event.preventDefault(); onOpenChange(false) }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false)
  const mobileNavigationTriggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const heroSearch = document.getElementById("home-search")
    if (!header || !heroSearch) return

    let observer: IntersectionObserver
    const observe = () => {
      observer?.disconnect()
      observer = new IntersectionObserver(([entry]) => {
        setShowSearch(!entry.isIntersecting)
      }, { rootMargin: `-${header.getBoundingClientRect().bottom}px 0px 0px 0px` })
      observer.observe(heroSearch)
    }
    const resizeObserver = new ResizeObserver(observe)
    resizeObserver.observe(header)
    observe()
    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b bg-white text-foreground">
      <a href="#main-content" className={cn(focus, "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:bg-white focus:p-3")}>Lewati ke konten</a>
      <div className="hidden border-b bg-[#fafafa] min-[992px]:block">
        <PageContainer className="flex min-h-10 flex-wrap items-center gap-x-6 gap-y-2 py-2 text-xs">
          <a href="https://play.google.com/store/search?q=Mamikos&c=apps" className={cn(focus, "flex items-center gap-2")}><img src={asset + "icons/navigation/ic_smartphone.svg"} width="16" height="16" alt="" />Download App</a>
          <button type="button" aria-disabled="true" onClick={(event) => event.preventDefault()} className={cn(focus, "flex cursor-pointer items-center gap-2")}><img src={asset + "icons/navigation/ic_calendar.svg"} width="16" height="16" alt="" />Sewa Kos</button>
        </PageContainer>
      </div>
      <PageContainer className="flex h-14 items-center gap-3 min-[992px]:h-16 sm:gap-6">
        <a href="/" aria-label="Mamikos beranda" className={cn(focus, "block w-8 shrink-0 overflow-hidden sm:w-[136px]")}>
          <img src={asset + "brand/logo_mamikos_green_v2.svg"} alt="Mamikos" width="136" height="32" className="h-8 w-[136px] max-w-none" />
        </a>
        <button
          type="button"
          aria-disabled="true"
          aria-label="Pencarian hanya tersedia di versi lengkap"
          onClick={(event) => event.preventDefault()}
          className={cn(focus, "ml-0 flex h-9 min-w-0 flex-1 cursor-pointer items-center justify-between rounded-lg border border-input bg-white p-1 text-left shadow-sm hover:bg-white min-[992px]:ml-4 min-[992px]:h-11 min-[992px]:max-w-[434px] sm:ml-4 sm:gap-3", !showSearch && "invisible")}
        >
          <span className="flex min-w-0 items-center gap-2">
            <MagnifyingGlassIcon aria-hidden="true" className="ml-1 size-5 shrink-0" />
            <span className="min-w-0 flex-1 truncate px-1 py-2 text-sm font-semibold text-muted-foreground">Masukan nama lokasi/area/alamat</span>
          </span>
          <span className="flex h-full shrink-0 items-center rounded-md bg-primary px-3 text-sm font-bold text-white sm:px-5">Cari</span>
        </button>
        <nav aria-label="Navigasi utama" className="hidden h-full items-center gap-5 min-[1280px]:ml-auto min-[1280px]:flex">
          <PlaceholderMenu label="Cari Apa?" items={propertyMenuItems} />
          <PlaceholderNavButton label="Favorit" />
          <PlaceholderNavButton label="Chat" />
          <PlaceholderNavButton label="Notifikasi" notification />
          <PlaceholderMenu label="Lainnya" items={moreMenuItems} />
        </nav>
        <button type="button" aria-disabled="true" aria-label="Profil" onClick={(event) => event.preventDefault()} className={cn(focus, "ml-auto hidden shrink-0 cursor-pointer min-[1280px]:block min-[1280px]:ml-0")}><img src={asset + "icons/navigation/ic_profile.svg"} width="44" height="44" alt="" className="block size-9 min-[992px]:size-11" /></button>
        <button
          ref={mobileNavigationTriggerRef}
          type="button"
          aria-label="Buka navigasi"
          aria-haspopup="dialog"
          aria-expanded={mobileNavigationOpen}
          className={cn(focus, "ml-auto flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-muted min-[1280px]:hidden")}
          onClick={() => setMobileNavigationOpen(true)}
        >
          <HamburgerMenuIcon aria-hidden="true" className="size-6" />
        </button>
      </PageContainer>
      <MobileNavigationSheet open={mobileNavigationOpen} onOpenChange={setMobileNavigationOpen} finalFocus={mobileNavigationTriggerRef} />
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t bg-white text-sm text-foreground">
      <PageContainer className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_0.8fr_1.1fr_1.2fr] lg:gap-6">
          <div id="download-app" className="scroll-mt-36">
            <a href="/" className={cn(focus, "inline-block")}><img src={asset + "brand/logo_mamikos_green_v2.svg"} width="136" height="32" alt="Mamikos" /></a>
            <p className="mt-5 max-w-64 leading-6">Dapatkan "info kost murah" hanya di MamiKos App.</p>
            <p className="mt-4">Mau "Sewa Kost Murah"?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a className={focus} href="https://play.google.com/store/search?q=Mamikos&c=apps" aria-label="Mamikos di Google Play"><img src={asset + "app-stores/get-it-on-playstore.svg"} alt="Google Play" className="h-9 w-auto" /></a>
              <a className={focus} href="https://apps.apple.com/id/search?term=mamikos" aria-label="Mamikos di App Store"><img src={asset + "app-stores/get-it-on-appstore.svg"} alt="App Store" className="h-9 w-auto" /></a>
            </div>
          </div>
          <nav aria-label="Mamikos" className="flex flex-col items-start gap-4"><h2 className="mb-1 font-bold">MAMIKOS</h2><a className={linkStyle} href="https://mamikos.com/tentang-kami">Tentang Kami</a><a className={linkStyle} href="https://mamikos.com/career">Job Mamikos</a><a className={linkStyle} href="https://mamikos.com/promosi-kost">Promosikan Kost Anda</a><a className={linkStyle} href="https://help.mamikos.com/">Pusat Bantuan</a></nav>
          <nav aria-label="Layanan Mamikos" className="flex flex-col items-start gap-4 lg:pt-10"><a className={linkStyle} href="https://mamikos.com/info/">Blog Mamikos</a><a className={linkStyle} href="https://singgahsini.id/">Singgahsini</a></nav>
          <nav aria-label="Kebijakan" className="flex flex-col items-start gap-4"><h2 className="mb-1 font-bold">KEBIJAKAN</h2><a className={linkStyle} href="https://help.mamikos.com/post/kebijakan-privasi-mamikos">Kebijakan Privasi</a><a className={linkStyle} href="https://help.mamikos.com/syarat-dan-ketentuan/">Syarat dan Ketentuan Umum</a></nav>
          <div>
            <h2 className="mb-5 font-bold">HUBUNGI KAMI</h2>
            <a className={cn(linkStyle, "flex items-center gap-2")} href="mailto:cs@mamikos.com"><EnvelopeClosedIcon aria-hidden="true" className="size-5 shrink-0" />cs@mamikos.com</a>
            <a className={cn(linkStyle, "mt-4 flex items-center gap-2")} href="https://wa.me/6281232511171" aria-label="WhatsApp Mamikos +6281232511171"><ChatBubbleIcon aria-hidden="true" className="size-5 shrink-0" />+6281232511171</a>
            <nav aria-label="Media sosial" className="mt-5 flex items-center gap-4">
              <a className={cn(focus, "text-xl font-bold leading-5")} href="https://www.facebook.com/mamikos" aria-label="Facebook Mamikos"><span aria-hidden="true">f</span></a>
              <a className={cn(focus, "text-xl leading-5")} href="https://x.com/mamikos" aria-label="X Mamikos"><span aria-hidden="true">𝕏</span></a>
              <a className={focus} href="https://www.instagram.com/mamikos/" aria-label="Instagram Mamikos"><InstagramLogoIcon aria-hidden="true" className="size-5" /></a>
            </nav>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t pt-6 sm:flex-row sm:items-center"><img src={asset + "certifications/iso-certificate-v2.svg"} alt="Sertifikasi ISO" className="h-14 max-w-full w-auto" /><p className="text-xs text-muted-foreground">© 2026 Mamikos.com. All rights reserved</p></div>
      </PageContainer>
    </footer>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  return <div className="flex min-h-dvh flex-col bg-background text-foreground"><SiteHeader /><main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main><SiteFooter /></div>
}
