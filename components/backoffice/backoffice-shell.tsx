"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useState, type ReactNode } from "react"
import {
  BookOpenText,
  ChevronRight,
  FolderKanban,
  LayoutDashboard,
  Menu,
  Settings,
  X,
} from "lucide-react"

import { SignOutButton } from "@/components/sign-out-button"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { AppRole } from "@/lib/supabase/types"

type BackofficeShellProps = {
  children: ReactNode
  role: AppRole | null | undefined
  userEmail: string | null | undefined
}

function getNavItems(isAdmin: boolean) {
  return [
    {
      href: "/backend/backoffice/panel?view=dashboard",
      label: "Resumen",
      description: "Panorama operativo del panel",
      icon: LayoutDashboard,
    },
    {
      href: "/backend/backoffice/panel?view=content&section=news",
      label: "Contenido",
      description: "Noticias, blog y cursos",
      icon: BookOpenText,
    },
    {
      href: "/backend/backoffice/panel?view=media",
      label: "Media",
      description: "Biblioteca visual y recursos",
      icon: FolderKanban,
    },
    ...(isAdmin
      ? [
          {
            href: "/backend/backoffice/panel?view=settings&section=general",
            label: "Configuración",
            description: "Ajustes generales y acceso",
            icon: Settings,
          },
        ]
      : []),
  ]
}

function getRolePresentation(role: AppRole | null | undefined) {
  if (role === "admin") {
    return {
      label: "Perfil administrador",
      title: "Administración completa",
      description:
        "Gestionas contenido, biblioteca media y ajustes globales del sitio desde una sola vista.",
    }
  }

  return {
    label: "Perfil editor",
    title: "Edición de contenido",
    description:
      "Trabajas noticias, blog, cursos y recursos visuales sin tocar la configuración sensible.",
  }
}

export function BackofficeShell({
  children,
  role,
  userEmail,
}: BackofficeShellProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isAdmin = role === "admin"
  const navItems = getNavItems(isAdmin)
  const rawView = searchParams.get("view") ?? "dashboard"
  const currentView =
    rawView === "news" || rawView === "blog" || rawView === "courses"
      ? "content"
      : rawView === "settings" && !isAdmin
        ? "dashboard"
        : rawView

  return (
    <div className="min-h-[calc(100svh-4rem)] bg-[linear-gradient(180deg,rgba(224,87,128,0.08),transparent_24%),linear-gradient(120deg,rgba(90,182,194,0.12),transparent_30%)]">
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <aside className="sticky top-20 hidden h-[calc(100svh-6rem)] w-80 shrink-0 overflow-hidden rounded-[28px] border border-white/70 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:block">
          <SidebarContent
            pathname={pathname}
            currentView={currentView}
            role={role}
            userEmail={userEmail}
            navItems={navItems}
            onNavigate={() => undefined}
          />
        </aside>

        <div className="min-w-0 flex-1">
          <header className="mb-4 flex items-center justify-between gap-3 rounded-[28px] border border-white/70 bg-white/90 px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <Menu />
              </Button>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E05780]">
                  Panel interno
                </p>
                <h1 className="truncate text-lg font-semibold text-foreground sm:text-xl">
                  Backoffice editorial de Fundapica
                </h1>
              </div>
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <div className="rounded-2xl bg-secondary px-3 py-2 text-right">
                <p className="max-w-[220px] truncate text-sm font-medium text-foreground">
                  {userEmail ?? "Sin email"}
                </p>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {getRolePresentation(role).label}
                </p>
              </div>
              <SignOutButton />
            </div>
          </header>

          <div className="pb-8">{children}</div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Cerrar menú"
            className="absolute inset-0 bg-slate-950/45"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-[min(88vw,22rem)] overflow-hidden border-r border-white/60 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.24)]">
            <div className="flex items-center justify-end p-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
              >
                <X />
              </Button>
            </div>
            <SidebarContent
              pathname={pathname}
              currentView={currentView}
              role={role}
              userEmail={userEmail}
              navItems={navItems}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      ) : null}
    </div>
  )
}

type SidebarContentProps = {
  pathname: string
  currentView: string
  role: AppRole | null | undefined
  userEmail: string | null | undefined
  navItems: ReturnType<typeof getNavItems>
  onNavigate: () => void
}

function SidebarContent({
  pathname,
  currentView,
  role,
  userEmail,
  navItems,
  onNavigate,
}: SidebarContentProps) {
  const rolePresentation = getRolePresentation(role)

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto">
      <div className="border-b border-border/70 px-5 py-5">
        <div className="rounded-[24px] bg-[linear-gradient(135deg,#101828,#1d2939_52%,#E05780_160%)] p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Acceso institucional
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Fundapica Backoffice</h2>
          <p className="mt-2 text-sm leading-6 text-white/70">
            Panel pensado para mantener el sitio ordenado, publicar contenido con criterio y trabajar con una biblioteca visual más limpia.
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-3 py-4">
        {navItems.map((item) => {
          const itemView = item.href.split("view=")[1]?.split("&")[0] ?? "dashboard"
          const active = pathname === "/backend/backoffice/panel" && currentView === itemView

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors",
                active
                  ? "bg-[#E05780] text-white shadow-[0_14px_30px_rgba(224,87,128,0.28)]"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-2xl",
                  active ? "bg-white/16" : "bg-muted"
                )}
              >
                <item.icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">
                  {item.label}
                </span>
                <span
                  className={cn(
                    "block truncate text-xs",
                    active ? "text-white/75" : "text-muted-foreground"
                  )}
                >
                  {item.description}
                </span>
              </span>
              <ChevronRight className="size-4 shrink-0 opacity-60" />
            </Link>
          )
        })}
      </nav>

      <div className="space-y-3 border-t border-border/70 p-4">
        <div className="rounded-2xl bg-secondary p-3">
          <p className="truncate text-sm font-medium text-foreground">
            {userEmail ?? "Sin email"}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {rolePresentation.label}
          </p>
        </div>

        <div className="rounded-2xl border border-border/70 bg-white p-3">
          <p className="text-sm font-semibold text-foreground">{rolePresentation.title}</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {rolePresentation.description}
          </p>
        </div>

        <Link
          href="/frontend"
          onClick={onNavigate}
          className={buttonVariants({
            variant: "outline",
            className: "w-full justify-center",
          })}
        >
          Ver sitio público
        </Link>
      </div>
    </div>
  )
}
