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
import { Textarea } from "~/components/ui/textarea";
import type { Post } from "~/types/post";
import type { Category } from "~/types/category";
import { requireAdminAuth } from "~/lib/auth.server";
import { tokenCookie } from "./admin.login";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useEnv } from "~/lib/utils";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  await requireAdminAuth(request);

  // Fetch post
  const postRes = await fetch(
    `https://api.carloacutisteam.com/api/posts/${params.postId}`
  );
  if (!postRes.ok) throw new Response("Not found", { status: 404 });
  const post: Post = await postRes.json();

  // Fetch categories
  const catRes = await fetch("https://api.carloacutisteam.com/api/categories");
  if (!catRes.ok)
    throw new Response("Failed to fetch categories", { status: 500 });
  const categories: Category[] = await catRes.json();

  return json({ post, categories });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  await requireAdminAuth(request);
  const cookieHeader = request.headers.get("cookie");
  const token = (await tokenCookie.parse(cookieHeader)) || "";

  const formData = await request.formData();

  // Tạo formData mới để gửi lên API backend (multipart/form-data)
  const apiForm = new FormData();
  apiForm.append("title", formData.get("title") as string);
  apiForm.append("content", formData.get("content") as string);
  apiForm.append("category_id", formData.get("category_id") as string);
  apiForm.append("status", formData.get("status") as string);
  const image = formData.get("image");
  if (
    image &&
    typeof image !== "string" &&
    image instanceof File &&
    image.size > 0
  ) {
    apiForm.append("image", image as File);
  }
  // Nếu không chọn file mới, không append image => backend giữ hình cũ

  const res = await fetch(
    `https://api.carloacutisteam.com/api/posts/${params.postId}`,
    {
      method: "PUT",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: apiForm,
    }
  );

  if (!res.ok) {
    const error = await res.json();
    return json(
      { error: error.error || "Cập nhật bài viết thất bại" },
      { status: 400 }
    );
  }

  return redirect("/admin/posts");
};

export default function EditPost() {
  const { post, categories } = useLoaderData<{
    post: Post;
    categories: Category[];
  }>();
  const actionData = useActionData<typeof action>();
  const editorRef = useRef<any>(null);
  const { TINYMCE_API_KEY } = useEnv();

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      const hiddenInput = document.getElementById(
        "content-hidden"
      ) as HTMLInputElement;
      if (hiddenInput) hiddenInput.value = content;
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 w-full p-4 md:p-6 overflow-auto bg-gray-50 min-h-screen md:ml-64 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Chỉnh sửa bài viết</CardTitle>
          </CardHeader>
          <CardContent>
            <Form
              method="post"
              encType="multipart/form-data"
              className="space-y-6"
              onSubmit={handleFormSubmit}
            >
              {actionData?.error && (
                <div className="text-red-600 font-medium mb-2">
                  {actionData.error}
                </div>
              )}
              {post.image_url && (
                <div className="flex justify-center mb-4">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="max-h-48 rounded shadow"
                  />
                </div>
              )}
              <div>
                <label className="block mb-1 font-medium">Tiêu đề</label>
                <Input
                  type="text"
                  name="title"
                  defaultValue={post.title}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Danh mục</label>
                <select
                  name="category_id"
                  required
                  className="w-full border rounded px-3 py-2"
                  defaultValue={post.category_id}
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
                <label className="block mb-1 font-medium">Trạng thái</label>
                <select
                  name="status"
                  required
                  className="w-full border rounded px-3 py-2"
                  defaultValue={post.status}
                >
                  <option value="draft">Nháp</option>
                  <option value="published">Công khai</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Nội dung</label>
                <Editor
                  apiKey={TINYMCE_API_KEY}
                  onInit={(_evt: unknown, editor: unknown) =>
                    (editorRef.current = editor)
                  }
                  initialValue={post.content}
                  init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "visualchars",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "help",
                      "wordcount",
                      "emoticons",
                      "hr",
                      "pagebreak",
                      "toc",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic underline strikethrough forecolor backcolor | " +
                      "alignleft aligncenter alignright alignjustify | " +
                      "bullist numlist outdent indent | link image media table emoticons hr pagebreak toc | " +
                      "removeformat code fullscreen preview | help",
                    content_style:
                      "body { font-family:Inter,Arial,sans-serif; font-size:16px }",
                  }}
                />
                <input type="hidden" id="content-hidden" name="content" />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Hình ảnh mới (nếu muốn thay)
                </label>
                <Input type="file" name="image" accept="image/*" />
                <p className="text-xs text-gray-500 mt-1">
                  Để trống nếu muốn giữ hình cũ.
                </p>
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
