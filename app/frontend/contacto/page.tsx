import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"label">) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
}

function Textarea({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-32 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

const officeHours = [
  { day: "Lunes a Viernes", hours: "9:00 - 14:00 y 15:00 - 18:00" },
  { day: "Sabados y Domingos", hours: "Cerrado" },
]

export default function ContactoPage() {
  return (
    <main className="min-h-[calc(100svh-4.5rem)] bg-white">
      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-24 md:grid-cols-2 md:items-center md:gap-12 md:py-28">
        <Card className="border-foreground/10 shadow-sm">
          <CardHeader className="space-y-2">
            <CardTitle className="font-sans text-2xl font-bold tracking-[-0.04em] text-[#75A5E3]">
              Contacta con nosotros
            </CardTitle>
            <CardDescription>
              Cuentanos que necesitas y te responderemos lo antes posible.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" name="nombre" placeholder="Tu nombre" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="correo">Correo</Label>
                <Input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Telefono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="600 000 000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensaje">Mensaje</Label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="Escribe aqui tu consulta si quieres darnos mas contexto."
                />
              </div>

              <Button className="w-full sm:w-auto" type="submit">
                Enviar
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="font-sans text-4xl font-extrabold tracking-[-0.055em] text-balance text-[#E05780] sm:text-5xl lg:text-6xl">
              ¡Contáctanos!
            </h1>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              Estamos aqui para ayudarte. Si tienes una duda sobre nuestros
              servicios, horarios o la mejor forma de empezar, escribenos y te
              orientamos con cercania y claridad.
            </p>
          </div>

          <Card className="border-foreground/10 bg-muted/30 shadow-sm">
            {/* <CardHeader>
              <CardTitle>Horarios</CardTitle>
              <CardDescription>
                Atendemos consultas durante la semana y parte del fin de semana.
              </CardDescription>
            </CardHeader> */}

            <CardContent className="space-y-4">
              {officeHours.map((schedule) => (
                <div
                  key={schedule.day}
                  className="flex items-center justify-between gap-4 border-b border-foreground/10 pb-4 last:border-b-0 last:pb-0"
                >
                  <span className="font-medium text-foreground">{schedule.day}</span>
                  <span className="text-sm text-muted-foreground">{schedule.hours}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="border-foreground/10 shadow-sm md:col-span-2">
          <CardHeader className="space-y-2">
            <CardTitle className="font-sans text-xl font-bold tracking-[-0.04em] text-[#75A5E3]">
              Nuestra ubicación
            </CardTitle>
            <CardDescription>
            📍 Carrer de Rocafort, 67 - 69, local 10, Eixample, 08015 Barcelona
            </CardDescription>
          </CardHeader>

          <CardContent>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d748.4537273317509!2d2.1532649758904063!3d41.37810589989862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a39fef1dff05%3A0x8454a131454ce86a!2sAsociaci%C3%B3n%20De%20Fundapica!5e0!3m2!1ses!2ses!4v1776847794565!5m2!1ses!2ses"
              width="800"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[280px] w-full rounded-xl sm:h-[360px] md:h-[420px]"
            />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
