import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ConfiguracionGeneralPanel() {
  return (
    <Card className="border-white/70 bg-white/95 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
      <CardHeader>
        <CardTitle className="text-xl">Ajustes generales del sitio</CardTitle>
        <CardDescription>
          Este bloque debe concentrar lo que afecta al sitio completo: textos base, visibilidad de módulos y criterios editoriales que no cambian todos los días.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
        <div className="rounded-2xl border border-border/70 p-4">
          Definir qué textos son globales: encabezado institucional, mensajes destacados y bloques de portada.
        </div>
        <div className="rounded-2xl border border-border/70 p-4">
          Preparar ajustes de visibilidad para noticias, blog, cursos y secciones destacadas del frontend.
        </div>
        <div className="rounded-2xl border border-border/70 p-4">
          Mantener una configuración base para SEO: título general, descripción y recursos visuales compartidos.
        </div>
        <div className="rounded-2xl border border-border/70 p-4">
          Centralizar enlaces institucionales, datos de contacto y elementos recurrentes que aparecen en más de una página.
        </div>
      </CardContent>
    </Card>
  )
}
