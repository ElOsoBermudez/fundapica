"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
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
import { getMessages } from "@/lib/i18n/messages"
import { cn } from "@/lib/utils"
import { useLanguage, type Language } from "@/lib/i18n/language-context"

function isActivePath(pathname: string, href: string) {
  if (href === "/frontend") {
    return pathname === href
  }

  return pathname.startsWith(href)
}

type LanguageSwitcherProps = {
  value: Language
  labels: { languageLabel: string; languageEs: string; languageCa: string }
  onValueChange: (value: Language) => void
  className?: string
}

function LanguageSwitcher({
  value,
  labels,
  onValueChange,
  className,
}: LanguageSwitcherProps) {
  const languageOptions = [
    { value: "es", label: labels.languageEs },
    { value: "ca", label: labels.languageCa },
  ]

  return (
    <div className={cn("relative", className)}>
      <label htmlFor="site-language" className="sr-only">
        {labels.languageLabel}
      </label>
      <Select value={value} onValueChange={(nextValue) => nextValue && onValueChange(nextValue as Language)}>
        <SelectTrigger
          id="site-language"
          aria-label={labels.languageLabel}
          className="h-10 min-w-[7.75rem] rounded-none border-0 bg-transparent px-1 pr-0 text-sm font-medium text-slate-700 shadow-none outline-none ring-0 transition hover:bg-transparent hover:text-slate-950 focus-visible:ring-0 data-[popup-open]:text-[#75A5E3]"
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
  items: Array<{ href: string; label: string }>
  mobile?: boolean
  onNavigate?: () => void
  hoveredHref?: string | null
  onHoverChange?: (href: string | null) => void
}

function NavLinks({
  pathname,
  items,
  mobile = false,
  onNavigate,
  hoveredHref,
  onHoverChange,
}: NavLinksProps) {
  const highlightedHref = hoveredHref

  return (
    <>
      {items.map((item) => {
        const isActive = isActivePath(pathname, item.href)
        const isHighlighted = highlightedHref === item.href

        const linkClassName = mobile
          ? cn(
              "flex items-center rounded-[1.35rem] border px-4 py-3 text-base font-medium transition-all duration-200",
              isActive
                ? "border-[#75A5E3]/20 bg-gradient-to-r from-[#75A5E3] to-[#8bb5ec] text-white shadow-[0_14px_30px_rgba(117,165,227,0.24)]"
                : "border-black/5 bg-white text-slate-700 hover:border-[#75A5E3]/15 hover:bg-[#75A5E3]/6 hover:text-slate-950"
            )
          : cn(
              "relative flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold tracking-[0.01em] no-underline decoration-transparent border-0 shadow-none outline-none ring-0 transition-colors duration-200",
              isHighlighted
                ? "text-[#75A5E3]"
                : isActive
                  ? "text-[#75A5E3]"
                  : "text-slate-600 hover:text-[#75A5E3]"
            )

        if (mobile) {
          return (
            <SheetClose
              nativeButton={false}
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
              onMouseEnter={() => onHoverChange?.(item.href)}
              onFocus={() => onHoverChange?.(item.href)}
              onBlur={() => onHoverChange?.(null)}
            >
              {isHighlighted ? (
                <motion.span
                  layoutId="site-header-nav-highlight"
                  className="pointer-events-none absolute inset-0 rounded-full border border-white/75 bg-gradient-to-r from-[#75A5E3]/18 via-white to-[#E05780]/18 shadow-[0_12px_28px_rgba(117,165,227,0.18)]"
                  transition={{ type: "spring", stiffness: 360, damping: 28, mass: 0.8 }}
                />
              ) : null}
              {isActive ? (
                <span
                  className={cn(
                    "pointer-events-none absolute inset-x-5 bottom-1.5 h-0.5 rounded-full bg-gradient-to-r from-[#75A5E3] to-[#E05780] transition-opacity duration-200",
                    isHighlighted ? "opacity-100" : "opacity-60"
                  )}
                />
              ) : null}
              <span className="relative z-10">{item.label}</span>
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
  const copy = getMessages(language).header
  const [desktopHoveredHref, setDesktopHoveredHref] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigationItems = [
    { href: "/frontend", label: copy.nav.home },
    { href: "/frontend/cursos", label: copy.nav.courses },
    { href: "/frontend/news", label: copy.nav.news },
    { href: "/frontend/contacto", label: copy.nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-0 shadow-none outline-none backdrop-blur-xl transition-colors duration-300",
        isScrolled ? "bg-white/80" : "bg-white/55"
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/frontend"
          className="flex shrink-0 items-center rounded-full transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#75A5E3]/35"
          aria-label={copy.goHome}
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
            <NavigationMenuList
              className="gap-1.5 rounded-full border border-white/90 bg-white/70 p-1.5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl"
              onMouseLeave={() => setDesktopHoveredHref(null)}
            >
              <NavLinks
                pathname={pathname}
                items={navigationItems}
                hoveredHref={desktopHoveredHref}
                onHoverChange={setDesktopHoveredHref}
              />
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher value={language} labels={copy} onValueChange={setLanguage} />

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
              {copy.backoffice}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher
            value={language}
            labels={copy}
            onValueChange={setLanguage}
            className="max-w-[9.75rem]"
          />

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              aria-label={copy.openMenu}
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
                  {copy.mobileMenuTitle}
                </SheetTitle>
                <SheetDescription className="mt-1 text-sm text-slate-500">
                  {copy.mobileMenuDescription}
                </SheetDescription>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <nav aria-label="Navegacion movil" className="flex flex-col gap-2">
                  <NavLinks
                    pathname={pathname}
                    items={navigationItems}
                    mobile
                    onNavigate={() => setMobileMenuOpen(false)}
                  />
                </nav>

                <div className="rounded-3xl border border-black/5 bg-slate-50 p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {copy.languageBlockTitle}
                  </p>
                  <LanguageSwitcher value={language} labels={copy} onValueChange={setLanguage} />
                </div>

                {isBackofficePanel ? (
                  <SignOutButton />
                ) : (
                  <SheetClose
                    nativeButton={false}
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
                    {copy.backoffice}
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
