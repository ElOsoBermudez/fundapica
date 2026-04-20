import type { ReactNode } from "react"

import { BackofficeShell } from "@/components/backoffice/backoffice-shell"
import { requireAuthenticatedUser } from "@/lib/auth/server"

export default async function BackofficePanelLayout({
  children,
}: {
  children: ReactNode
}) {
  const auth = await requireAuthenticatedUser("/backend/backoffice/panel")

  return (
    <BackofficeShell role={auth.profile?.role} userEmail={auth.userEmail}>
      {children}
    </BackofficeShell>
  )
}
