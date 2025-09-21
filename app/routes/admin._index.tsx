import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Sidebar from "~/components/SideBar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { requireAdminAuth } from "~/lib/auth.server";

interface LoaderData {
  postsCount: number;
  categoriesCount: number;
  usersCount: number;
}

export const loader: LoaderFunction = async ({ request }) => {
  await requireAdminAuth(request);
  try {
    const [postsRes, categoriesRes, usersRes] = await Promise.all([
      fetch("https://api.carloacutisteam.com/api/posts"),
      fetch("https://api.carloacutisteam.com/api/categories"),
      fetch("https://api.carloacutisteam.com/api/users").catch(() => null),
    ]);

    if (!postsRes.ok) {
      throw new Response("Failed to fetch posts", { status: 500 });
    }
    if (!categoriesRes.ok) {
      throw new Response("Failed to fetch categories", { status: 500 });
    }

    const posts = await postsRes.json();
    const categories = await categoriesRes.json();
    const users = usersRes && usersRes.ok ? await usersRes.json() : [];

    return json({
      postsCount: posts.length,
      categoriesCount: categories.length,
      usersCount: users.length,
    });
  } catch (error) {
    console.error("Loader error:", error);
    return json({
      postsCount: 0,
      categoriesCount: 0,
      usersCount: 0,
    });
  }
};

export default function AdminLayout() {
  const { postsCount, categoriesCount, usersCount } =
    useLoaderData<LoaderData>();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 w-full p-4 md:p-6 overflow-auto bg-gray-50 min-h-screen md:ml-64">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Chào mừng đến trang quản trị
          </h1>
          <p className="text-gray-600 mt-2">
            Quản lý bài viết, danh mục, và người dùng một cách dễ dàng. Chọn một
            mục từ sidebar để bắt đầu.
          </p>
          <Separator className="my-4" />
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Tổng quan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-800">
                  {postsCount}
                </p>
                <p className="text-gray-600">Bài viết</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-800">
                  {categoriesCount}
                </p>
                <p className="text-gray-600">Danh mục</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-800">{1}</p>
                <p className="text-gray-600">Người dùng</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
