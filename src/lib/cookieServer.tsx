import { cookies } from "next/headers";

export async function getCookieServer() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session')?.value;
  return cookie || null;
}