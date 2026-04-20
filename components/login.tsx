"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import {
  getDefaultRedirectPath,
  getSafeRedirectPath,
} from "@/lib/auth/roles";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { AppRole, Profile } from "@/lib/supabase/types";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const routeError =
    searchParams.get("reason") === "auth-required"
      ? "Inicia sesión para continuar."
      : "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Completa el correo y la contraseña para continuar.");
      return;
    }

    setLoading(true);
    setError("");

    const supabase = createBrowserSupabaseClient();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError || !data.user) {
      setLoading(false);
      setError(signInError?.message ?? "No se pudo iniciar sesión.");
      return;
    }

    const profileResult = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    const profile = profileResult.data as Pick<Profile, "role"> | null;
    const profileError = profileResult.error;

    if (profileError) {
      setLoading(false);
      setError("Se inició sesión, pero no se pudo cargar el perfil.");
      return;
    }

    const fallbackPath = getDefaultRedirectPath(
      (profile?.role as AppRole | undefined) ?? "user",
    );
    const redirectPath = getSafeRedirectPath(
      searchParams.get("next"),
      fallbackPath,
    );

    router.replace(redirectPath);
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex h-full w-full p-4">
        <div className="m-auto flex w-full max-w-md flex-col items-center rounded-[32px] border border-white/70 bg-white/95 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <Logo className="h-10 w-10" />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#E05780]">
            Backoffice Fundapica
          </p>
          <h1 className="mt-3 text-center text-2xl font-semibold tracking-tight text-foreground">
            Acceso al panel de gestión
          </h1>
          <p className="mt-3 text-center text-sm leading-6 text-muted-foreground">
            Inicia sesión con tu cuenta institucional para administrar personas,
            competencias y contenidos del sitio.
          </p>

          <form className="mt-8 w-full space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Correo institucional</label>
              <Input
                className="w-full"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nombre@fundapica.org"
                type="email"
                value={email}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contraseña</label>
              <Input
                className="w-full"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Introduce tu contraseña"
                type="password"
                value={password}
              />
            </div>
            {error || routeError ? (
              <p className="text-sm text-destructive">{error || routeError}</p>
            ) : null}
            <Button
              className="mt-4 h-11 w-full bg-[#E05780] text-white hover:bg-[#d14a74]"
              disabled={loading}
              type="submit"
            >
              {loading ? "Accediendo..." : "Entrar al backoffice"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Acceso reservado para personal autorizado.
          </p>
          <Link
            className="mt-3 text-sm font-medium text-[#E05780] underline-offset-4 hover:underline"
            href="/frontend"
          >
            Volver al sitio público
          </Link>
        </div>
        <div className="relative hidden max-w-xl grow lg:block">
          <Image
            alt="Login"
            className="absolute inset-0 size-full rounded-xl object-cover"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src="/images/ascii-art.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
