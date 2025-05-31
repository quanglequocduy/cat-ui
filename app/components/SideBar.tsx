import { Link, useLocation } from "@remix-run/react";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { useState } from "react";

const navItems = [
  { to: "/admin/posts", label: "Bài viết" },
  { to: "/admin/categories", label: "Danh mục" },
  // ...thêm nhiều mục nếu muốn
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Sidebar desktop */}
      <aside className="hidden md:flex w-64 bg-gray-800 text-white flex-col h-screen fixed left-0 top-0">
        <div className="p-6 font-bold text-lg tracking-wide border-b border-gray-700">
          Admin CAT
        </div>
        <nav className="flex-1 px-4 overflow-y-auto">
          <ul className="space-y-2 py-4">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`block px-4 py-2 rounded transition ${
                    location.pathname.startsWith(item.to)
                      ? "bg-cat-orange text-white font-semibold"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Sidebar mobile */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="fixed top-4 left-4 z-50 md:hidden"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Mở menu</span>
            <svg width={24} height={24} fill="none" stroke="currentColor">
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 bg-gray-800 text-white">
          <div className="p-6 font-bold text-lg tracking-wide border-b border-gray-700">
            Admin Panel
          </div>
          <nav className="px-4 overflow-y-auto h-[calc(100vh-64px)]">
            <ul className="space-y-2 py-4">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`block px-4 py-2 rounded transition ${
                      location.pathname.startsWith(item.to)
                        ? "bg-blue-600 text-white font-semibold"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
