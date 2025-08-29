// lib/auth/client.ts
const BASE = process.env.NEXT_PUBLIC_API_BASE ?? ""; // 예: http://localhost:8000

export async function isLoggedIn(): Promise<boolean> {
  if (!BASE) return false;

  try {
    const res = await fetch(`${BASE}/me`, {
      method: "GET",
      credentials: "include", // httpOnly 쿠키 포함
    });
    return res.status === 200;
  } catch {
    return false;
  }
}
