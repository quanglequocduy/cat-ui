import { ActionFunction, redirect, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import Sidebar from "~/components/SideBar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { requireAdminAuth } from "~/lib/auth.server";
import { tokenCookie } from "./admin.login";

export const action: ActionFunction = async ({ request }) => {
  await requireAdminAuth(request);
  const cookieHeader = request.headers.get("cookie");
  const token = (await tokenCookie.parse(cookieHeader)) || "";
  const formData = await request.formData();
  const name = formData.get("name");

  try {
    const res = await fetch(
      "https://cat-api-rho.vercel.app/api/categories",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ name }),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      console.log(`Error creating category:`, error);
      return json(
        { error: error.error || "Tạo danh mục thất bại" },
        { status: 400 }
      );
    }

    return redirect("/admin/categories");
  } catch (err) {
    return json({ error: "Lỗi kết nối server" }, { status: 500 });
  }
};

export default function NewCategory() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 w-full p-4 md:p-6 overflow-auto bg-gray-50 min-h-screen md:ml-64 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Thêm danh mục mới</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              {actionData?.error && (
                <div className="text-red-600 font-medium mb-2">
                  {actionData.error}
                </div>
              )}
              <div>
                <label className="block mb-1 font-medium">Tên danh mục</label>
                <Input type="text" name="name" required />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  type="submit"
                  variant="default"
                  className="bg-cat-orange text-white"
                >
                  Tạo mới
                </Button>
                <Button asChild variant="outline">
                  <a href="/admin/categories">Huỷ</a>
                </Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
