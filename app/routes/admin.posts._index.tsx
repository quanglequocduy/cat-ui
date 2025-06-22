import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link, Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Category, Post } from "~/types";
import Sidebar from "~/components/SideBar";
import { requireAdminAuth } from "~/lib/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireAdminAuth(request);
  const res = await fetch("https://cat-api-kmk7.onrender.com/api/posts");
  if (!res.ok) {
    throw new Response("Failed to fetch posts", { status: 500 });
  }
  const posts: Post[] = await res.json();

  const categoriesRes = await fetch(
    "https://cat-api-kmk7.onrender.com/api/categories"
  );
  if (!categoriesRes.ok) {
    throw new Response("Failed to fetch categories", { status: 500 });
  }
  const categories: Category[] = await categoriesRes.json();
  return json({ posts, categories });
};

function StatusTag({ status }: { status: string }) {
  if (status === "published") {
    return (
      <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-700">
        Công khai
      </span>
    );
  }
  return (
    <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-orange-100 text-orange-700">
      Nháp
    </span>
  );
}

export default function PostList() {
  const { posts, categories } = useLoaderData<typeof loader>();
  const categoryMap = Object.fromEntries(
    categories.map((cat: Category) => [cat.id, cat.name])
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 w-full p-4 md:p-6 overflow-auto bg-gray-50 min-h-screen md:ml-64">
        {/* Phần tiêu đề và nút "Thêm bài viết" trên cùng dòng */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Danh sách bài viết
            </h1>
            <p className="text-gray-600 mt-2">
              Xem và quản lý tất cả bài viết của bạn tại đây.
            </p>
          </div>
          <Button asChild className="hover:bg-cat-blue bg-blue-500 text-white">
            <Link to="/admin/posts/new">Thêm bài viết</Link>
          </Button>
        </div>

        {/* Bảng bài viết */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bài viết</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Tiêu đề
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Hình ảnh
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Danh mục
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Trạng thái
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Nội dung
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-3 text-center text-gray-500"
                      >
                        Không có bài viết nào.
                      </td>
                    </tr>
                  ) : (
                    posts.map((post: Post) => (
                      <tr key={post.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-900 truncate max-w-[200px] md:max-w-[300px]">
                          {post.title}
                        </td>
                        <td className="px-4 py-3">
                          {post.image_url ? (
                            <img
                              src={post.image_url}
                              alt={post.title}
                              className="w-16 h-16 object-cover rounded-md"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://via.placeholder.com/64?text=Image+Not+Found";
                              }}
                            />
                          ) : (
                            <span className="text-gray-500">
                              Không có hình ảnh
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-900">
                          {categoryMap[post.category_id] || "Không rõ"}
                        </td>
                        <td className="px-4 py-3">
                          <StatusTag status={post.status} />
                        </td>
                        <td className="px-4 py-3 text-gray-600 truncate max-w-[200px] md:max-w-[400px]">
                          {post.content}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-2 md:flex-row md:space-x-2">
                            <Link to={`/admin/posts/${post.id}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full md:w-auto"
                              >
                                Chỉnh sửa
                              </Button>
                            </Link>
                            <Form
                              method="post"
                              action={`/admin/posts/${post.id}/delete`}
                              className="w-full md:w-auto"
                            >
                              <Button
                                size="sm"
                                variant="destructive"
                                className="w-full md:w-auto"
                                type="submit"
                                onClick={(e) => {
                                  if (
                                    !window.confirm(
                                      "Bạn có chắc chắn muốn xoá bài viết này?"
                                    )
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                              >
                                Xoá
                              </Button>
                            </Form>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
