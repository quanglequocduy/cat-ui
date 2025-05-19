import { useState } from "react";
import { Link } from "@remix-run/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-cat-blue text-white p-4">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src="/logo-dark.png" alt="CAT Logo" className="h-12 mr-2" />
          <span className="text-sm">Carlo Acutis Team</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-cat-orange">
            Trang Chủ
          </Link>
          <Link to="/about" className="hover:text-cat-orange">
            Giới Thiệu
          </Link>
          <Link to="/services" className="hover:text-cat-orange">
            Dịch Vụ
          </Link>
          <Link to="/contact" className="hover:text-cat-orange">
            Liên Hệ
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden mt-4 space-y-2">
          <Link
            to="/"
            className="block hover:text-cat-orange border-b border-white pb-2"
            onClick={() => setIsOpen(false)}
          >
            Trang Chủ
          </Link>
          <Link
            to="/about"
            className="block hover:text-cat-orange border-b border-white pb-2"
            onClick={() => setIsOpen(false)}
          >
            Giới Thiệu
          </Link>
          <Link
            to="/services"
            className="block hover:text-cat-orange border-b border-white pb-2"
            onClick={() => setIsOpen(false)}
          >
            Dịch Vụ
          </Link>
          <Link
            to="/contact"
            className="block hover:text-cat-orange pb-2"
            onClick={() => setIsOpen(false)}
          >
            Liên Hệ
          </Link>
        </nav>
      )}
    </header>
  );
}