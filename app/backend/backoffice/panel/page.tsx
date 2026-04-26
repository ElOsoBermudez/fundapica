import { DashboardOverview } from "@/components/backoffice/dashboard-overview"
import { requireAdmin } from "@/lib/auth/server"

export default async function BackofficePanelPage() {
  const auth = await requireAdmin("/backend/backoffice/panel")

  return <DashboardOverview role={auth.profile?.role} />
}
