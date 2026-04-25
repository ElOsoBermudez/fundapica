const missingVarsMessage = [
  "Missing Supabase environment variables.",
  "Define NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.",
  "You can copy .env.local.example as a starting point.",
].join(" ");

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(missingVarsMessage);
  }

  return { url, anonKey };
}
