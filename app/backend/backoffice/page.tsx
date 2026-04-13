import { redirectAuthenticatedUser } from "@/lib/auth/server";
import Login from "@/components/login";

export default async function BackofficePage() {
  await redirectAuthenticatedUser();

  return <Login />;
}
