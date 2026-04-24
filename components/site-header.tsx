"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { SignOutButton } from "@/components/sign-out-button"
import { buttonVariants } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useLanguage, type Language } from "@/lib/i18n/language-context"

const navigationItems = [
  { href: "/frontend", label: "Inicio" },
  { href: "/frontend/cursos", label: "Cursos" },
  { href: "/frontend/news", label: "Noticias" },
  { href: "/frontend/contacto", label: "Contacto" },
]

const languageOptions = [
  { value: "es", label: "Castellano" },
  { value: "ca", label: "Catalan" },
]

function isActivePath(pathname: string, href: string) {
  if (href === "/frontend") {
    return pathname === href
  }

  return pathname.startsWith(href)
}

type LanguageSwitcherProps = {
  value: Language
  onValueChange: (value: Language) => void
  className?: string
}

function LanguageSwitcher({
  value,
  onValueChange,
  className,
}: LanguageSwitcherProps) {
  return (
    <div className={cn("relative", className)}>
      <label htmlFor="site-language" className="sr-only">
        Seleccionar idioma
      </label>
      <Select value={value} onValueChange={(nextValue) => nextValue && onValueChange(nextValue as Language)}>
        <SelectTrigger
          id="site-language"
          aria-label="Seleccionar idioma"
          className="h-10 min-w-[7.75rem] rounded-none border-0 border-b border-slate-200/90 bg-transparent px-1 pr-0 text-sm font-medium text-slate-700 shadow-none transition hover:border-[#75A5E3] hover:bg-transparent hover:text-slate-950 focus-visible:border-[#75A5E3] focus-visible:ring-0 data-[popup-open]:border-[#75A5E3] data-[popup-open]:text-[#75A5E3]"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          align="end"
          sideOffset={12}
          className="min-w-[10rem] rounded-2xl border border-black/5 bg-white p-1.5 shadow-[0_20px_45px_rgba(15,23,42,0.12)]"
        >
          {languageOptions.map((language) => (
            <SelectItem
              key={language.value}
              value={language.value}
              className="rounded-xl px-3 py-2 text-sm data-[selected]:bg-[#75A5E3]/12 data-[selected]:text-[#75A5E3]"
            >
              {language.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

type NavLinksProps = {
  pathname: string
  mobile?: boolean
  onNavigate?: () => void
}

function NavLinks({ pathname, mobile = false, onNavigate }: NavLinksProps) {
  return (
    <>
      {navigationItems.map((item) => {
        const isActive = isActivePath(pathname, item.href)

        const linkClassName = mobile
          ? cn(
              "flex items-center rounded-2xl px-4 py-3 text-base font-medium transition",
              isActive
                ? "bg-[#75A5E3] text-white shadow-sm"
                : "text-slate-700 hover:bg-slate-100 hover:text-[#75A5E3]"
            )
          : cn(
              "px-4 py-2 text-sm font-medium transition-colors duration-200",
              isActive
                ? "text-[#75A5E3]"
                : "text-slate-600 hover:text-[#75A5E3]"
            )

        if (mobile) {
          return (
            <SheetClose
              key={item.href}
              render={
                <Link
                  href={item.href}
                  className={linkClassName}
                  aria-current={isActive ? "page" : undefined}
                />
              }
              onClick={onNavigate}
            >
              {item.label}
            </SheetClose>
          )
        }

        return (
          <NavigationMenuItem key={item.href}>
            <Link
              href={item.href}
              className={linkClassName}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          </NavigationMenuItem>
        )
      })}
    </>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const isBackofficePanel = pathname.startsWith("/backend/backoffice/panel")
  const { language, setLanguage } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/frontend"
          className="flex shrink-0 items-center rounded-full transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#75A5E3]/35"
          aria-label="Ir a Inicio"
        >
          <Image
            src="/logo.webp"
            alt="Fundapica"
            width={146}
            height={46}
            priority
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center md:flex">
          <NavigationMenu className="max-w-none flex-1 justify-center">
            <NavigationMenuList className="gap-1 rounded-none border-0 bg-transparent p-0 shadow-none backdrop-blur-0">
              <NavLinks pathname={pathname} />
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher value={language} onValueChange={setLanguage} />

          {isBackofficePanel ? (
            <SignOutButton />
          ) : (
            <Link
              href="/backend/backoffice"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-10 rounded-full border-0 bg-[#E05780] px-5 text-sm font-semibold text-white shadow-none transition hover:bg-[#75A5E3] focus-visible:ring-[#75A5E3]/35"
              )}
            >
              Backoffice
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher
            value={language}
            onValueChange={setLanguage}
            className="max-w-[9.75rem]"
          />

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              aria-label="Abrir menu de navegacion"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon-lg" }),
                "size-10 rounded-full border-black/10 bg-white/85 shadow-sm hover:bg-white"
              )}
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[88vw] max-w-sm border-l border-black/5 bg-white/95 px-6 py-6 backdrop-blur-xl"
            >
              <div className="pr-10">
                <SheetTitle className="text-lg font-semibold text-slate-950">
                  Navegacion
                </SheetTitle>
                <SheetDescription className="mt-1 text-sm text-slate-500">
                  Acceso rapido a las secciones principales de Fundapica.
                </SheetDescription>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <nav aria-label="Navegacion movil" className="flex flex-col gap-2">
                  <NavLinks
                    pathname={pathname}
                    mobile
                    onNavigate={() => setMobileMenuOpen(false)}
                  />
                </nav>

                <div className="rounded-3xl border border-black/5 bg-slate-50 p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Idioma
                  </p>
                  <LanguageSwitcher value={language} onValueChange={setLanguage} />
                </div>

                {isBackofficePanel ? (
                  <SignOutButton />
                ) : (
                  <SheetClose
                    render={
                      <Link
                        href="/backend/backoffice"
                        className={cn(
                          buttonVariants({ variant: "default", size: "lg" }),
                          "flex h-11 w-full items-center justify-center rounded-2xl border-0 bg-[#E05780] px-5 text-sm font-semibold text-white shadow-none transition hover:bg-[#75A5E3] focus-visible:ring-[#75A5E3]/35"
                        )}
                      />
                    }
                  >
                    Backoffice
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
