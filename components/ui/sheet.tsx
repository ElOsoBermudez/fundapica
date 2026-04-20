"use client"

import * as React from "react"
import { Dialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = Dialog.Root
const SheetTrigger = Dialog.Trigger
const SheetPortal = Dialog.Portal
const SheetClose = Dialog.Close
const SheetTitle = Dialog.Title
const SheetDescription = Dialog.Description

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Backdrop>,
  React.ComponentPropsWithoutRef<typeof Dialog.Backdrop>
>(({ className, ...props }, ref) => (
  <Dialog.Backdrop
    ref={ref}
    data-slot="sheet-overlay"
    className={cn("fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]", className)}
    {...props}
  />
))
SheetOverlay.displayName = "SheetOverlay"

const SheetContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Popup>,
  React.ComponentPropsWithoutRef<typeof Dialog.Popup>
>(({ className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <Dialog.Popup
      ref={ref}
      data-slot="sheet-content"
      className={cn(
        "fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-border bg-background p-6 shadow-2xl",
        className
      )}
      {...props}
    >
      {children}
      <SheetClose
        className="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Close menu"
      >
        <X className="size-4" />
      </SheetClose>
    </Dialog.Popup>
  </SheetPortal>
))
SheetContent.displayName = "SheetContent"

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
}
