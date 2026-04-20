import { DashboardOverview } from "@/components/backoffice/dashboard-overview"
import { requireAuthenticatedUser } from "@/lib/auth/server"

export default async function BackofficePanelPage() {
  const auth = await requireAuthenticatedUser("/backend/backoffice/panel")

  return <DashboardOverview role={auth.profile?.role} />
}
