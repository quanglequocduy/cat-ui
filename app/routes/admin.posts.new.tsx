import {
  ActionFunction,
  LoaderFunction,
  redirect,
  json,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import Sidebar from "~/components/SideBar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import type { Category } from "~/types/category";
import { requireAdminAuth } from "~/lib/auth.server";
import { tokenCookie } from "./admin.login";

export const loader: LoaderFunction = async ({ request }) => {
  await requireAdminAuth(request);
  const res = await fetch("https://cat-api-kmk7.onrender.com/api/categories");
  if (!res.ok)
    throw new Response("Failed to fetch categories", { status: 500 });
  const categories: Category[] = await res.json();
  return json({ categories });
};

export const action: ActionFunction = async ({ request }) => {
  await requireAdminAuth(request);
  const cookieHeader = request.headers.get("cookie");
  const token = (await tokenCookie.parse(cookieHeader)) || "";
  const formData = await request.formData();

  const apiForm = new FormData();
  apiForm.append("title", formData.get("title") as string);
  apiForm.append("content", formData.get("content") as string);
  apiForm.append("category_id", formData.get("category_id") as string);
  if (formData.get("image")) {
    apiForm.append("image", formData.get("image") as File);
  }

  try {
    const res = await fetch("https://cat-api-kmk7.onrender.com/api/posts", {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: apiForm,
    });

    if (!res.ok) {
      const error = await res.json();
      return json(
        { error: error.error || "Tạo bài viết thất bại" },
        { status: 400 }
      );
    }

    return redirect("/admin/posts");
  } catch (err) {
    return json({ error: "Lỗi kết nối server" }, { status: 500 });
  }
};

export default function NewPost() {
  const { categories } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 w-full p-4 md:p-6 overflow-auto bg-gray-50 min-h-screen md:ml-64 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Tạo bài viết mới</CardTitle>
          </CardHeader>
          <CardContent>
            <Form
              method="post"
              encType="multipart/form-data"
              className="space-y-6"
            >
              {actionData?.error && (
                <div className="text-red-600 font-medium mb-2">
                  {actionData.error}
                </div>
              )}
              <div>
                <label className="block mb-1 font-medium">Tiêu đề</label>
                <Input type="text" name="title" required />
              </div>
              <div>
                <label className="block mb-1 font-medium">Danh mục</label>
                <select
                  name="category_id"
                  required
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((cat: Category) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Nội dung</label>
                <Textarea name="content" rows={8} required />
              </div>
              <div>
                <label className="block mb-1 font-medium">Hình ảnh</label>
                <Input type="file" name="image" accept="image/*" />
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
                  <a href="/admin/posts">Huỷ</a>
                </Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
