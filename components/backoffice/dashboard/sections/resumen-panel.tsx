type SummaryStat = {
  label: string
  value: string
  helper: string
  icon: unknown
}

export function ResumenPanel({
  statCards: _statCards,
  isAdmin: _isAdmin,
}: {
  statCards: SummaryStat[]
  isAdmin: boolean
}) {
  return (
    <>
      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]" />
      <section className="grid gap-4 md:grid-cols-3" />
      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]" />
    </>
  )
}
