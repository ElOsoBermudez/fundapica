import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ModuleHero({
  badge,
  title,
  description,
  actions,
}: {
  badge: string
  title: string
  description: string
  actions?: React.ReactNode
}) {
  return (
    <Card className="border-white/70 bg-white/95 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
      <CardHeader className="gap-3">
        <div className="inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#E05780]">
          {badge}
        </div>
        <CardTitle className="text-2xl sm:text-3xl">{title}</CardTitle>
        <CardDescription className="max-w-3xl text-sm leading-6 sm:text-base">
          {description}
        </CardDescription>
      </CardHeader>
      {actions ? <CardContent>{actions}</CardContent> : null}
    </Card>
  )
}

export function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="border-white/70 bg-white/95 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
      <CardHeader>
        <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-[#E05780]">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export function LinkButton({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: "outline",
        className: cn("h-11 rounded-2xl px-4", className),
      })}
    >
      {children}
    </Link>
  )
}
