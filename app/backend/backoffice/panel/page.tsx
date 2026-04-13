import { requireAuthenticatedUser } from "@/lib/auth/server";
import { SignOutButton } from "@/components/sign-out-button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function BackofficePanelPage() {
  const auth = await requireAuthenticatedUser("/backend/backoffice/panel");

  return (
    <div className="mx-auto w-full max-w-6xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Backoffice</CardTitle>
          <CardDescription>Panel protegido con Supabase Auth para usuarios autenticados.</CardDescription>
          <CardAction>
            <SignOutButton />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Acceso concedido para: {auth.userEmail ?? "Sin email"}</p>
            <p>Rol actual: {auth.profile?.role ?? "Sin perfil"}</p>
            <p>ID de usuario: {auth.userId}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
