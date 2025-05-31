import { Links, Meta, Outlet, Scripts, useLocation } from "@remix-run/react";
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
