import { createCookie } from "@remix-run/node";

export const tokenCookie = createCookie("token", {
  httpOnly: true,
  path: "/",
  sameSite: "none",
  secure: true,
  maxAge: 60 * 60 * 24 * 7,
  encode: String,
});

export async function requireAdminAuth(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const token = (await tokenCookie.parse(cookieHeader)) || "";
  if (!token) {
    throw new Response("Unauthorized", {
      status: 302,
      headers: { Location: "/admin/login" },
    });
  }
  return token;
}
