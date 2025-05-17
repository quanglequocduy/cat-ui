import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap",
    },
    { rel: "stylesheet", href: "/app/tailwind.css" }, // Import CSS qua links()
  ];
}

export default function App() {
  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
