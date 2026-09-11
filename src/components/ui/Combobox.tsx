import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

function Combobox(props: React.ComponentProps<typeof ComboboxPrimitive.Root>) {
  return <ComboboxPrimitive.Root {...props} />
}

const ComboboxTrigger = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof ComboboxPrimitive.Trigger>>(
  function ComboboxTrigger({ className, children, ...props }, ref) {
    return (
      <ComboboxPrimitive.Trigger ref={ref} className={cn("inline-flex h-9 min-w-40 items-center justify-between gap-3 border-b border-transparent bg-transparent px-1 text-primary outline-none transition hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring", className)} {...props}>
        {children}
        <ChevronDownIcon aria-hidden="true" className="size-4 shrink-0" />
      </ComboboxPrimitive.Trigger>
    )
  },
)

function ComboboxValue(props: React.ComponentProps<typeof ComboboxPrimitive.Value>) {
  return <ComboboxPrimitive.Value {...props} />
}

function ComboboxPopup({ className, ...props }: React.ComponentProps<typeof ComboboxPrimitive.Popup>) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner sideOffset={6} className="z-50">
        <ComboboxPrimitive.Popup className={cn("min-w-[var(--anchor-width)] overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg outline-none", className)} {...props} />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList(props: React.ComponentProps<typeof ComboboxPrimitive.List>) {
  return <ComboboxPrimitive.List className="max-h-60 overflow-y-auto" {...props} />
}

const ComboboxItem = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof ComboboxPrimitive.Item>>(
  function ComboboxItem({ className, children, ...props }, ref) {
    return (
      <ComboboxPrimitive.Item ref={ref} className={cn("flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground", className)} {...props}>
        <ComboboxPrimitive.ItemIndicator className="flex size-4 items-center justify-center">
          <CheckIcon aria-hidden="true" className="size-4" />
        </ComboboxPrimitive.ItemIndicator>
        <span className="min-w-0 truncate">{children}</span>
      </ComboboxPrimitive.Item>
    )
  },
)

export { Combobox, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger, ComboboxValue }
