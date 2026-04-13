import "server-only";

import { redirect } from "next/navigation";

import {
  getDefaultRedirectPath,
  getSafeRedirectPath,
  isAdminRole,
} from "@/lib/auth/roles";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";

export type AuthContext = {
  profile: Profile | null;
  userId: string;
  userEmail: string | null | undefined;
};

export async function getCurrentUserProfile() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const profileResult = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  const profile = profileResult.data as Profile | null;

  return {
    profile,
    userId: user.id,
    userEmail: user.email,
  } satisfies AuthContext;
}

export async function requireAuthenticatedUser(nextPath: string) {
  const auth = await getCurrentUserProfile();

  if (!auth) {
    const loginPath = new URLSearchParams({
      next: getSafeRedirectPath(nextPath, "/backend/backoffice/panel"),
      reason: "auth-required",
    });

    redirect(`/backend/backoffice?${loginPath.toString()}`);
  }

  return auth;
}

export async function requireAdmin(
  nextPath = "/backend/backoffice/panel",
): Promise<AuthContext & { profile: Profile }> {
  const auth = await requireAuthenticatedUser(nextPath);
  const profile = auth.profile;

  if (!profile || !isAdminRole(profile.role)) {
    redirect("/frontend?error=forbidden");
  }

  return {
    ...auth,
    profile,
  };
}

export async function redirectAuthenticatedUser() {
  const auth = await getCurrentUserProfile();

  if (!auth) {
    return;
  }

  redirect(getDefaultRedirectPath(auth.profile?.role));
}
