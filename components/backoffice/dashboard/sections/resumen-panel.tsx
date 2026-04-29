"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Inbox,
  LucideIcon,
  Mail,
  MessageSquare,
  Newspaper,
  PencilLine,
  Phone,
  Plus,
  Sparkles,
  Trash2,
  User,
} from "lucide-react"



import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createBrowserSupabaseClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

type SummaryStat = {
  label: string
  value: string
  helper: string
  icon: LucideIcon
}

type ActivityItem = {
  id: string
  title: string
  category: string | null
  createdAt: string
  source: "noticia" | "curso"
  detail: string | null
}

type ContactItem = {
  id: string
  nombre: string
  email: string
  telefono: string | null
  mensaje: string | null
  created_at: string
}

type CalendarEventType = "reunion" | "publicacion" | "seguimiento"

type CalendarEvent = {
  id: string
  date: string
  title: string
  description: string
  type: CalendarEventType
}

const WEEKDAY_LABELS = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]

const CALENDAR_EVENT_STYLES: Record<
  CalendarEventType,
  { label: string; badge: string }
> = {
  reunion: {
    label: "Reunion",
    badge: "bg-[#75A5E3]/12 text-[#75A5E3]",
  },
  publicacion: {
    label: "Publicacion",
    badge: "bg-[#E05780]/12 text-[#E05780]",
  },
  seguimiento: {
    label: "Seguimiento",
    badge: "bg-emerald-100 text-emerald-700",
  },
}

function getGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) return "Buenos dias"
  if (hour < 20) return "Buenas tardes"
  return "Buenas noches"
}

function getDisplayNameFromEmail(email: string | null) {
  if (!email) return "equipo"

  const localPart = email.split("@")[0] ?? ""
  const cleaned = localPart
    .replace(/[._-]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ")

  return cleaned || "equipo"
}

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")

  return `${year}-${month}-${day}`
}

function fromDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number)

  return new Date(year, (month || 1) - 1, day || 1)
}

function formatLongDate(date: Date) {
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function formatShortDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function formatDateTime(isoDate: string) {
  return new Date(isoDate).toLocaleString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function sortEvents(events: CalendarEvent[]) {
  return [...events].sort((a, b) => {
    if (a.date === b.date) {
      return a.title.localeCompare(b.title, "es-ES")
    }

    return a.date.localeCompare(b.date)
  })
}

function getCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const firstWeekday = (firstDay.getDay() + 6) % 7
  const gridStart = new Date(year, month, 1 - firstWeekday)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + index)

    return {
      date,
      dateKey: toDateKey(date),
      isCurrentMonth: date.getMonth() === month,
    }
  })
}

function getMonthTitle(date: Date) {
  return date.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  })
}

function getStartOfWeek(date: Date) {
  const start = new Date(date)
  const day = (start.getDay() + 6) % 7
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - day)
  return start
}

function getEndOfWeek(date: Date) {
  const end = getStartOfWeek(date)
  end.setDate(end.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return end
}

function createEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function ResumenPanel({
  statCards,
}: {
  statCards: SummaryStat[]
  isAdmin: boolean
}) {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [newsActivity, setNewsActivity] = useState<ActivityItem[]>([])
  const [coursesActivity, setCoursesActivity] = useState<ActivityItem[]>([])
  const [totalNews, setTotalNews] = useState(0)
  const [totalCourses, setTotalCourses] = useState(0)
  const [contacts, setContacts] = useState<ContactItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [monthCursor, setMonthCursor] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })
  const [selectedDateKey, setSelectedDateKey] = useState(() => toDateKey(new Date()))
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([])
  const [calendarLoaded, setCalendarLoaded] = useState(false)
  const [eventTitle, setEventTitle] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventType, setEventType] = useState<CalendarEventType>("reunion")
  const [editingEventId, setEditingEventId] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadDashboardSnapshot() {
      const supabase = createBrowserSupabaseClient()

      setIsLoading(true)

      const [
        authResult,
        recentNewsResult,
        recentCoursesResult,
        newsCountResult,
        coursesCountResult,
        contactsResult,
      ] = await Promise.all([
        supabase.auth.getUser(),
        supabase
          .from("noticias")
          .select("id, titulo, created_at, categorias(nombre)")
          .order("created_at", { ascending: false })
          .limit(4),
        supabase
          .from("cursos")
          .select("id, titulo, created_at, tipo, categorias_cursos(nombre)")
          .order("created_at", { ascending: false })
          .limit(4),
        supabase.from("noticias").select("*", { count: "exact", head: true }),
        supabase.from("cursos").select("*", { count: "exact", head: true }),
        supabase
          .from("contactos")
          .select("id, nombre, email, telefono, mensaje, created_at")
          .order("created_at", { ascending: false })
          .limit(20),
      ])

      if (!isMounted) return

      setUserEmail(authResult.data.user?.email ?? null)
      setTotalNews(newsCountResult.count ?? 0)
      setTotalCourses(coursesCountResult.count ?? 0)
      setContacts((contactsResult.data ?? []) as ContactItem[])

      setNewsActivity(
        (recentNewsResult.data ?? []).map((item) => ({
          id: item.id,
          title: item.titulo,
          category: (item.categorias as unknown as { nombre: string } | null)?.nombre ?? null,
          createdAt: item.created_at,
          source: "noticia",
          detail: "Alta reciente en noticias",
        }))
      )

      setCoursesActivity(
        (recentCoursesResult.data ?? []).map((item) => ({
          id: item.id,
          title: item.titulo,
          category: (item.categorias_cursos as unknown as { nombre: string } | null)?.nombre ?? null,
          createdAt: item.created_at,
          source: "curso",
          detail: item.tipo ? `Curso para ${item.tipo}` : "Alta reciente en cursos",
        }))
      )

      setIsLoading(false)
    }

    loadDashboardSnapshot()

    return () => {
      isMounted = false
    }
  }, [])

  const calendarStorageKey = `fundapica-backoffice-calendar:${userEmail ?? "guest"}`

  useEffect(() => {
    let isMounted = true

    async function loadCalendar() {
      await Promise.resolve()

      if (typeof window === "undefined" || !isMounted) return

      try {
        const storedValue = window.localStorage.getItem(calendarStorageKey)
        const parsed = storedValue ? (JSON.parse(storedValue) as CalendarEvent[]) : []

        if (isMounted) {
          setCalendarEvents(sortEvents(parsed))
          setCalendarLoaded(true)
        }
      } catch {
        if (isMounted) {
          setCalendarEvents([])
          setCalendarLoaded(true)
        }
      }
    }

    loadCalendar()

    return () => {
      isMounted = false
    }
  }, [calendarStorageKey])

  useEffect(() => {
    if (!calendarLoaded || typeof window === "undefined") return

    window.localStorage.setItem(calendarStorageKey, JSON.stringify(calendarEvents))
  }, [calendarEvents, calendarLoaded, calendarStorageKey])

  const combinedActivity = [...newsActivity, ...coursesActivity]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6)

  const eventsByDate = calendarEvents.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = []
    }

    acc[event.date].push(event)
    return acc
  }, {})

  const selectedDateEvents = sortEvents(eventsByDate[selectedDateKey] ?? [])
  const todayKey = toDateKey(new Date())
  const displayName = getDisplayNameFromEmail(userEmail)
  const currentMonthDays = getCalendarDays(monthCursor)
  const selectedDateLabel = formatLongDate(fromDateKey(selectedDateKey))
  const selectedDateCount = selectedDateEvents.length
  const upcomingEvents = sortEvents(calendarEvents.filter((event) => event.date >= todayKey)).slice(0, 4)
  const weekStartKey = toDateKey(getStartOfWeek(new Date()))
  const weekEndKey = toDateKey(getEndOfWeek(new Date()))
  const thisWeekEvents = calendarEvents.filter(
    (event) => event.date >= weekStartKey && event.date <= weekEndKey
  )
  const weekTypeCounts = thisWeekEvents.reduce<Record<CalendarEventType, number>>(
    (acc, event) => {
      acc[event.type] += 1
      return acc
    },
    { reunion: 0, publicacion: 0, seguimiento: 0 }
  )

  const resetEventForm = () => {
    setEventTitle("")
    setEventDescription("")
    setEventType("reunion")
    setEditingEventId(null)
  }

  const handleSaveEvent = () => {
    const trimmedTitle = eventTitle.trim()
    const trimmedDescription = eventDescription.trim()

    if (!trimmedTitle) return

    const nextEventRecord: CalendarEvent = {
      id: editingEventId ?? createEventId(),
      date: selectedDateKey,
      title: trimmedTitle,
      description: trimmedDescription,
      type: eventType,
    }

    setCalendarEvents((current) => {
      const withoutCurrent = current.filter((event) => event.id !== nextEventRecord.id)
      return sortEvents([nextEventRecord, ...withoutCurrent])
    })

    resetEventForm()
  }

  const handleEditEvent = (event: CalendarEvent) => {
    const eventDate = fromDateKey(event.date)

    setEditingEventId(event.id)
    setSelectedDateKey(event.date)
    setMonthCursor(new Date(eventDate.getFullYear(), eventDate.getMonth(), 1))
    setEventTitle(event.title)
    setEventDescription(event.description)
    setEventType(event.type)
  }

  const handleDeleteEvent = (eventId: string) => {
    setCalendarEvents((current) => current.filter((event) => event.id !== eventId))

    if (editingEventId === eventId) {
      resetEventForm()
    }
  }

  return (
    <>
      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.95fr]">
        <Card className="overflow-hidden border-white/70 bg-[radial-gradient(circle_at_top_left,_rgba(117,165,227,0.18),_transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96))] shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <CardHeader className="gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#E05780] ring-1 ring-black/5">
              <Sparkles className="size-3.5" />
              Resumen del panel
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl sm:text-3xl">
                {getGreeting()}, {displayName}
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/80 bg-white/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Noticias registradas
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-950">
                  {isLoading ? "..." : totalNews}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Altas recientes del area informativa.
                </p>
              </div>

              <div className="rounded-3xl border border-white/80 bg-white/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Cursos activos
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-950">
                  {isLoading ? "..." : totalCourses}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Cursos listos para catalogo y consulta.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/backend/backoffice/panel?view=noticias"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "h-11 rounded-2xl border-0 bg-[#75A5E3] px-5 text-white shadow-none hover:bg-[#5f95da]"
                )}
              >
                Ir a noticias
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/backend/backoffice/panel?view=cursos"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-2xl border-black/10 bg-white/80 px-5 text-slate-700 hover:border-[#E05780]/20 hover:bg-[#E05780]/5 hover:text-[#E05780]"
                )}
              >
                Ir a cursos
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col border-white/70 bg-white/95 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
          <CardHeader className="gap-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#E05780]/12 text-[#E05780]">
                <Inbox className="size-6" />
              </div>
              {!isLoading && contacts.length > 0 && (
                <span className="inline-flex items-center rounded-full bg-[#E05780]/10 px-3 py-1 text-xs font-semibold text-[#E05780]">
                  {contacts.length} contacto{contacts.length === 1 ? "" : "s"}
                </span>
              )}
            </div>
            <CardTitle className="text-xl">Contactos recibidos</CardTitle>
            <CardDescription className="leading-6">
              Mensajes enviados desde el formulario publico de contacto.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="h-24 animate-pulse rounded-3xl bg-slate-100" />
                ))}
              </div>
            ) : contacts.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-black/10 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                Aun no hay contactos recibidos.
              </div>
            ) : (
              <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="rounded-3xl border border-black/5 bg-slate-50 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-950">
                        <User className="size-3.5 text-[#E05780]" />
                        {contact.nombre}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <CalendarDays className="size-3" />
                        {formatDateTime(contact.created_at)}
                      </span>
                    </div>

                    <div className="mt-2 space-y-1">
                      <p className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                        <Mail className="size-3 shrink-0" />
                        {contact.email}
                      </p>
                      {contact.telefono && (
                        <p className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                          <Phone className="size-3 shrink-0" />
                          {contact.telefono}
                        </p>
                      )}
                    </div>

                    {contact.mensaje && (
                      <div className="mt-3 flex items-start gap-2 rounded-2xl border border-black/5 bg-white px-3 py-2">
                        <MessageSquare className="mt-0.5 size-3.5 shrink-0 text-[#75A5E3]" />
                        <p className="text-xs leading-5 text-slate-600">{contact.mensaje}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon

          return (
            <Card
              key={card.label}
              className="border-white/70 bg-white/95 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
            >
              <CardHeader className="gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#E05780]/12 text-[#E05780]">
                  <Icon className="size-5" />
                </div>
                <div className="space-y-1">
                  <CardDescription className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {card.label}
                  </CardDescription>
                  <CardTitle className="text-3xl font-semibold">{card.value}</CardTitle>
                </div>
              </CardHeader>
            </Card>
          )
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <Card className="border-white/70 bg-white/95 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
            <CardHeader className="gap-3">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#E05780]/12 text-[#E05780]">
                <PencilLine className="size-6" />
              </div>
              <CardTitle className="text-xl">Actividad reciente</CardTitle>
              <CardDescription className="leading-6">
                Noticias y cursos creados recientemente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {combinedActivity.length ? (
                combinedActivity.map((item) => (
                  <div
                    key={`${item.source}-${item.id}`}
                    className="flex items-start gap-3 rounded-3xl border border-black/5 bg-slate-50 p-4"
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl",
                        item.source === "noticia"
                          ? "bg-[#75A5E3]/12 text-[#75A5E3]"
                          : "bg-[#E05780]/12 text-[#E05780]"
                      )}
                    >
                      {item.source === "noticia" ? (
                        <Newspaper className="size-4" />
                      ) : (
                        <BookOpenCheck className="size-4" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                            item.source === "noticia"
                              ? "bg-[#75A5E3]/12 text-[#75A5E3]"
                              : "bg-[#E05780]/12 text-[#E05780]"
                          )}
                        >
                          {item.source === "noticia" ? "Noticias" : "Cursos"}
                        </span>
                        <span className="text-xs text-slate-400">{formatShortDate(item.createdAt)}</span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-slate-950">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {item.detail}
                        {item.category ? ` - ${item.category}` : ""}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-black/10 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                  Aun no hay actividad reciente para mostrar aqui.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-white/70 bg-white/95 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
            <CardHeader className="gap-3">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#75A5E3]/12 text-[#75A5E3]">
                <Clock3 className="size-6" />
              </div>
              <CardTitle className="text-xl">Planificacion</CardTitle>
              <CardDescription className="leading-6">
                Proximos hitos y carga semanal para organizar el trabajo del equipo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {Object.entries(CALENDAR_EVENT_STYLES).map(([type, style]) => (
                  <div
                    key={type}
                    className="rounded-3xl border border-black/5 bg-slate-50 p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {style.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950">
                      {weekTypeCounts[type as CalendarEventType]}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">Programados esta semana</p>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-dashed border-[#75A5E3]/30 bg-[#75A5E3]/6 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#75A5E3]">
                  Proximo bloque
                </p>
                {upcomingEvents[0] ? (
                  <>
                    <p className="mt-2 text-base font-semibold text-slate-950">
                      {upcomingEvents[0].title}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {formatLongDate(fromDateKey(upcomingEvents[0].date))}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {upcomingEvents[0].description || "Sin notas adicionales para este evento."}
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    No hay eventos futuros todavia. Te recomiendo usar este bloque para programar
                    publicaciones semanales y una reunion fija de seguimiento.
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Proximos eventos
                </p>
                {upcomingEvents.length ? (
                  upcomingEvents.map((event) => {
                    const eventStyle = CALENDAR_EVENT_STYLES[event.type]

                    return (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => handleEditEvent(event)}
                        className="flex w-full items-start justify-between gap-3 rounded-3xl border border-black/5 bg-slate-50 p-4 text-left transition hover:border-[#75A5E3]/20 hover:bg-white"
                      >
                        <div className="min-w-0">
                          <span
                            className={cn(
                              "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                              eventStyle.badge
                            )}
                          >
                            {eventStyle.label}
                          </span>
                          <p className="mt-2 text-sm font-semibold text-slate-950">{event.title}</p>
                          <p className="mt-1 text-sm text-slate-500">
                            {formatShortDate(event.date)}
                          </p>
                        </div>
                        <ArrowRight className="mt-1 size-4 shrink-0 text-slate-400" />
                      </button>
                    )
                  })
                ) : (
                  <div className="rounded-3xl border border-dashed border-black/10 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                    Cuando anadas eventos en el calendario, aqui veras una hoja de ruta rapida de lo siguiente.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

        </div>

        <Card className="border-white/70 bg-white/95 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
          <CardHeader className="gap-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl">Calendario</CardTitle>
                <CardDescription className="mt-1 leading-6">
                  Reuniones, publicaciones y seguimiento del equipo.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  className="rounded-xl"
                  onClick={() =>
                    setMonthCursor(
                      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1)
                    )
                  }
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  className="rounded-xl"
                  onClick={() =>
                    setMonthCursor(
                      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1)
                    )
                  }
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="rounded-3xl border border-black/5 bg-slate-50 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold capitalize text-slate-950">
                    {getMonthTitle(monthCursor)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {selectedDateCount} evento{selectedDateCount === 1 ? "" : "s"} en la fecha seleccionada
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-black/5">
                  <Clock3 className="mr-1.5 size-3.5" />
                  {formatShortDate(selectedDateKey)}
                </span>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                {WEEKDAY_LABELS.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-7 gap-2">
                {currentMonthDays.map((day) => {
                  const isSelected = day.dateKey === selectedDateKey
                  const isToday = day.dateKey === todayKey
                  const eventsCount = eventsByDate[day.dateKey]?.length ?? 0

                  return (
                    <button
                      key={day.dateKey}
                      type="button"
                      onClick={() => {
                        setSelectedDateKey(day.dateKey)

                        if (!day.isCurrentMonth) {
                          setMonthCursor(new Date(day.date.getFullYear(), day.date.getMonth(), 1))
                        }
                      }}
                      className={cn(
                        "relative flex aspect-square flex-col items-center justify-center rounded-2xl border text-sm transition",
                        day.isCurrentMonth
                          ? "border-black/5 bg-white text-slate-700 hover:border-[#75A5E3]/20 hover:text-slate-950"
                          : "border-transparent bg-transparent text-slate-400 hover:bg-white/70",
                        isSelected &&
                          "border-[#75A5E3]/25 bg-gradient-to-br from-[#75A5E3]/14 to-[#E05780]/12 text-slate-950 shadow-[0_12px_24px_rgba(117,165,227,0.14)]",
                        isToday && !isSelected && "border-[#E05780]/20 text-[#E05780]"
                      )}
                    >
                      <span className="font-medium">{day.date.getDate()}</span>
                      {eventsCount ? (
                        <span className="mt-1 inline-flex items-center gap-1">
                          <span className="size-1.5 rounded-full bg-[#75A5E3]" />
                          <span className="text-[10px] text-slate-400">{eventsCount}</span>
                        </span>
                      ) : null}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-black/5 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold capitalize text-slate-950">{selectedDateLabel}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Añade un recordatorio o edita los eventos de esta fecha.
                  </p>
                </div>
                {editingEventId ? (
                  <button
                    type="button"
                    className="text-sm font-medium text-slate-500 transition hover:text-slate-950"
                    onClick={resetEventForm}
                  >
                    Cancelar edicion
                  </button>
                ) : null}
              </div>

              <div className="mt-4 space-y-3">
                <Input
                  value={eventTitle}
                  onChange={(event) => setEventTitle(event.target.value)}
                  placeholder="Titulo del evento"
                  className="h-11 rounded-2xl border-black/10 bg-slate-50 px-4"
                />

                <Select value={eventType} onValueChange={(value) => setEventType(value as CalendarEventType)}>
                  <SelectTrigger className="h-11 rounded-2xl border-black/10 bg-slate-50 px-4">
                    <SelectValue placeholder="Tipo de evento" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    {Object.entries(CALENDAR_EVENT_STYLES).map(([value, option]) => (
                      <SelectItem key={value} value={value} className="rounded-xl">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <textarea
                  value={eventDescription}
                  onChange={(event) => setEventDescription(event.target.value)}
                  placeholder="Descripcion breve o notas internas"
                  rows={3}
                  className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#75A5E3] focus:ring-2 focus:ring-[#75A5E3]/15"
                />

                <Button
                  type="button"
                  variant="default"
                  size="lg"
                  className="h-11 rounded-2xl bg-[#75A5E3] px-5 text-white shadow-none hover:bg-[#5f95da]"
                  onClick={handleSaveEvent}
                  disabled={!eventTitle.trim()}
                >
                  <Plus className="size-4" />
                  {editingEventId ? "Guardar cambios" : "Añadir evento"}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {selectedDateEvents.length ? (
                selectedDateEvents.map((event) => {
                  const eventStyle = CALENDAR_EVENT_STYLES[event.type]

                  return (
                    <div
                      key={event.id}
                      className="rounded-3xl border border-black/5 bg-slate-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <span
                            className={cn(
                              "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                              eventStyle.badge
                            )}
                          >
                            {eventStyle.label}
                          </span>
                          <p className="mt-2 text-sm font-semibold text-slate-950">{event.title}</p>
                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            {event.description || "Sin notas adicionales para este evento."}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            className="rounded-xl"
                            onClick={() => handleEditEvent(event)}
                          >
                            <PencilLine className="size-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            className="rounded-xl text-[#E05780] hover:bg-[#E05780]/5 hover:text-[#E05780]"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="rounded-3xl border border-dashed border-black/10 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                  No hay eventos para esta fecha. Usa este espacio para reuniones, publicaciones o seguimiento interno.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
