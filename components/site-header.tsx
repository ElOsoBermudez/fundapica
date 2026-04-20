"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const navigationItems = [
  { href: "/frontend", label: "Inicio" },
  { href: "/frontend/cursos", label: "Cursos" },
  { href: "/backend", label: "Backend" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/frontend"
          className="flex shrink-0 items-center rounded-md outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Image
            src="/logo.webp"
            alt="Fundapica"
            width={140}
            height={44}
            priority
            className="h-11 w-auto"
          />
        </Link>

        {/* Desktop navigation uses shadcn-style primitives for a familiar app navbar layout. */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "h-9 rounded-full px-4 text-sm font-medium text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/backend/backoffice"
            className={buttonVariants({
              variant: "default",
              size: "sm",
              className:
                "h-9 rounded-full bg-foreground px-4 text-background shadow-sm hover:bg-foreground/90",
            })}
          >
            Backoffice
          </Link>
        </div>

        {/* Mobile navigation moves the links into a Sheet to keep the header compact. */}
        <Sheet>
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "outline", size: "icon-sm" }),
              "md:hidden"
            )}
            aria-label="Open navigation menu"
          >
            <Menu className="size-4" />
          </SheetTrigger>
          <SheetContent>
            <div className="flex items-center justify-between pr-10">
              <div>
                <SheetTitle className="text-lg font-semibold">Navigation</SheetTitle>
                <SheetDescription className="mt-1 text-sm text-muted-foreground">
                  Acceso rápido a las secciones principales del proyecto.
                </SheetDescription>
              </div>
            </div>

            <Separator className="my-6" />

            <nav className="flex flex-1 flex-col gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "justify-start rounded-xl px-4 text-base"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Separator className="my-6" />

            <Link
              href="/backend/backoffice"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className: "w-full rounded-xl bg-foreground text-background hover:bg-foreground/90",
              })}
            >
              Backoffice
            </Link>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
