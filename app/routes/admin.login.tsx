import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createCookie } from "@remix-run/node";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const tokenCookie = createCookie("token", {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7,
  encode: String,
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch("https://cat-api-rho.vercel.app/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Login error:", error);
    return json(
      { error: error.error || "Đăng nhập thất bại" },
      { status: 400 }
    );
  }

  const data = await res.json();
  const token = data.token;

  return redirect("/admin", {
    headers: {
      "Set-Cookie": await tokenCookie.serialize(token),
    },
  });
};

export default function AdminLogin() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-sm mx-auto shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Đăng nhập quản trị
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-6">
            {actionData?.error && (
              <div className="text-red-600 font-medium mb-2 text-center">
                {actionData.error}
              </div>
            )}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <Input type="email" name="email" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Mật khẩu</label>
              <Input type="password" name="password" required />
            </div>
            <Button type="submit" className="w-full bg-cat-orange text-white">
              Đăng nhập
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
