// lib/auth/client.ts
const BASE = process.env.NEXT_PUBLIC_API_BASE ?? ""; // 예: http://localhost:8000

export async function isLoggedIn(): Promise<boolean> {
  // 백엔드 주소를 못 받으면(프론트 라우트로 착각 방지) 비로그인 취급
  if (!BASE) return false;

  try {
    // 인증이 필요한 백엔드 엔드포인트로 핑
    const res = await fetch(`${BASE}/conversations?page=1&size=1`, {
      method: "GET",
      credentials: "include", // httpOnly 쿠키 포함
    });
    if (res.status === 200) return true;
    if (res.status === 401) return false;
    return false;
  } catch {
    return false;
  }
}
