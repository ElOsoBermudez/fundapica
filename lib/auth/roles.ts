import type { AppRole } from "@/lib/supabase/types";

export const DEFAULT_USER_REDIRECT = "/frontend";
export const DEFAULT_ADMIN_REDIRECT = "/backend/backoffice/panel";

export function isAdminRole(role: AppRole | null | undefined): role is "admin" {
  return role === "admin";
}

export function getDefaultRedirectPath(role: AppRole | null | undefined) {
  return isAdminRole(role) ? DEFAULT_ADMIN_REDIRECT : DEFAULT_USER_REDIRECT;
}

export function getSafeRedirectPath(
  candidate: string | null | undefined,
  fallback: string,
) {
  if (!candidate || !candidate.startsWith("/") || candidate.startsWith("//")) {
    return fallback;
  }

  return candidate;
}
