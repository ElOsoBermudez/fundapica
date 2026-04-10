import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BackofficePanelPage() {
  return (
    <div className="mx-auto w-full max-w-6xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Backoffice</CardTitle>
          <CardDescription>Acceso concedido (modo temporal sin autenticación real).</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Cualquier usuario y contraseña con contenido permiten entrar.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
