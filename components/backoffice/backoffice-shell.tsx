"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import type { ReactNode } from "react"
import {
  GraduationCap,
  Images,
  LayoutDashboard,
  Newspaper,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import type { AppRole } from "@/lib/supabase/types"

type BackofficeShellProps = {
  children: ReactNode
  role: AppRole | null | undefined
  userEmail: string | null | undefined
}

function getNavItems(_isAdmin: boolean) {
  return [
    {
      href: "/backend/backoffice/panel?view=dashboard",
      view: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/backend/backoffice/panel?view=noticias",
      view: "noticias",
      label: "Noticias",
      icon: Newspaper,
    },
    {
      href: "/backend/backoffice/panel?view=cursos",
      view: "cursos",
      label: "Cursos",
      icon: GraduationCap,
    },
    {
      href: "/backend/backoffice/panel?view=media",
      view: "media",
      label: "Fotos y videos",
      icon: Images,
    },
  ]
}

export function BackofficeShell({
  children,
  role,
  userEmail,
}: BackofficeShellProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const navItems = getNavItems(role === "admin")

  const currentView = searchParams.get("view") ?? "dashboard"

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="p-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Acceso institucional
            </p>
            <p className="mt-1 text-base font-semibold">Fundapica Backoffice</p>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Panel</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => {
                  const active =
                    pathname === "/backend/backoffice/panel" &&
                    currentView === item.view
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={active}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="px-2 py-1">
                <p className="truncate text-sm font-medium">
                  {userEmail ?? "Sin email"}
                </p>
                <p className="text-xs capitalize text-muted-foreground">
                  {role ?? "editor"}
                </p>
              </div>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link href="/frontend" />}>
                Ver sitio público
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E05780]">
              Panel interno
            </p>
            <p className="text-sm font-semibold text-foreground">
              Backoffice editorial de Fundapica
            </p>
          </div>
        </header>
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
