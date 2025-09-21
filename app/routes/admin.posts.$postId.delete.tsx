import {
  ActionFunction,
  redirect,
  json,
  LoaderFunction,
} from "@remix-run/node";
import { tokenCookie } from "./admin.login";
import { requireAdminAuth } from "~/lib/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireAdminAuth(request);
  return null;
};

export const action: ActionFunction = async ({ request, params }) => {
  const cookieHeader = request.headers.get("cookie");
  const token = (await tokenCookie.parse(cookieHeader)) || "";

  try {
    const res = await fetch(
      `https://api.carloacutisteam.com/api/posts/${params.postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    if (!res.ok) {
      const error = await res.json();
      return json(
        { error: error.error || "Xoá bài viết thất bại" },
        { status: 400 }
      );
    }

    return redirect("/admin/posts");
  } catch (err) {
    return json({ error: "Lỗi kết nối server" }, { status: 500 });
  }
};

export default function () {
  return null;
}
