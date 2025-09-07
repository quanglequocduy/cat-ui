import {
  ActionFunction,
  redirect,
  json,
  LoaderFunction,
} from "@remix-run/node";
import { requireAdminAuth } from "~/lib/auth.server";
import { tokenCookie } from "./admin.login";

export const loader: LoaderFunction = async ({ request }) => {
  await requireAdminAuth(request);
  return null;
};

export const action: ActionFunction = async ({ request, params }) => {
  const cookieHeader = request.headers.get("cookie");
  const token = (await tokenCookie.parse(cookieHeader)) || "";

  try {
    await fetch(
      `https://cat-api-rho.vercel.app/api/categories/${params.categoryId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return redirect("/admin/categories");
  } catch (err) {
    return json({ error: "Lỗi kết nối server" }, { status: 500 });
  }
};

export default function () {
  return null;
}
