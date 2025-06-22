import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  useLocation,
} from "@remix-run/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import tailwindStyles from "~/tailwind.css?url";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap",
    },
    { rel: "stylesheet", href: tailwindStyles },
  ];
}

export function ErrorBoundary({ error }: { error: unknown }) {
  return (
    <html lang="vi">
      <head>
        <Meta />
        <Links />
        <title>Lỗi hệ thống</title>
      </head>
      <body className="bg-gray-50">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Đã có lỗi xảy ra!
          </h1>
          <a href="/admin" className="text-cat-orange underline">
            Quay về Admin
          </a>
        </div>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const loader = () => {
  return json({
    ENV: {
      TINYMCE_API_KEY: process.env.TINYMCE_API_KEY,
    },
  });
};

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
        <Meta />
        <Links />
      </head>
      <body>
        {!isAdmin && <Header />}
        <Outlet />
        {!isAdmin && <Footer />}
        <Scripts />
      </body>
    </html>
  );
}
