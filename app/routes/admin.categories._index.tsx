import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Link, Form } from "@remix-run/react";
import Sidebar from "~/components/SideBar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import type { Category } from "~/types/category";
import { requireAdminAuth } from "~/lib/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireAdminAuth(request);
  const res = await fetch("https://cat-api-rho.vercel.app/api/categories");
  if (!res.ok)
    throw new Response("Failed to fetch categories", { status: 500 });
  const categories: Category[] = await res.json();
  return json(categories);
};

export default function CategoryList() {
  const categories = useLoaderData<Category[]>();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 w-full p-4 md:p-6 overflow-auto bg-gray-50 min-h-screen md:ml-64">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Danh mục</h1>
            <p className="text-gray-600 mt-2">Quản lý danh mục bài viết.</p>
          </div>
          <Button asChild className="hover:bg-cat-blue bg-blue-500 text-white">
            <Link to="/admin/categories/new">Thêm danh mục</Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Danh sách danh mục</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Tên danh mục
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Ngày tạo
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900">{cat.name}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(cat.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-2 md:flex-row md:space-x-2">
                          <Link to={`/admin/categories/${cat.id}`}>
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
                            action={`/admin/categories/${cat.id}/delete`}
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
                                    "Bạn có chắc chắn muốn xoá danh mục này?"
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
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
