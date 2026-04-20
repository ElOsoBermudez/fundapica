"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);

    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();

    router.replace("/backend/backoffice");
    router.refresh();
  };

  return (
    <Button
      disabled={loading}
      onClick={handleSignOut}
      type="button"
      variant="outline"
    >
      {loading ? "Cerrando sesión..." : "Cerrar sesión"}
    </Button>
  );
}
