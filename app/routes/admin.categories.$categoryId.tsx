import {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData, Form, useActionData } from "@remix-run/react";
import Sidebar from "~/components/SideBar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { Category } from "~/types/category";
import { requireAdminAuth } from "~/lib/auth.server";
import { tokenCookie } from "./admin.login";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  await requireAdminAuth(request);
  const res = await fetch(
    `https://cat-api-kmk7.onrender.com/api/categories/${params.categoryId}`
  );
  if (!res.ok) throw new Response("Not found", { status: 404 });
  const category: Category = await res.json();
  return json(category);
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const cookieHeader = request.headers.get("cookie");
  const token = (await tokenCookie.parse(cookieHeader)) || "";
  const formData = await request.formData();
  const name = formData.get("name");

  const res = await fetch(
    `https://cat-api-kmk7.onrender.com/api/categories/${params.categoryId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ name }),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    return json(
      { error: error.error || "Cập nhật danh mục thất bại" },
      { status: 400 }
    );
  }

  return redirect("/admin/categories");
};

export default function EditCategory() {
  const category = useLoaderData<Category>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 w-full p-4 md:p-6 overflow-auto bg-gray-50 min-h-screen md:ml-64 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Chỉnh sửa danh mục</CardTitle>
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
                <Input
                  type="text"
                  name="name"
                  defaultValue={category.name}
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  type="submit"
                  variant="default"
                  className="bg-cat-orange text-white"
                >
                  Lưu thay đổi
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
