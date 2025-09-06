import { useState } from "react";
import { Link } from "@remix-run/react";
import { Link as ScrollLink } from "react-scroll";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#00376C] text-white px-4 py-3 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/CAT-Logo.jpg" alt="CAT Logo" className="h-12" />
          <div className="leading-tight hidden sm:block">
            <div className="text-xl font-bold">CAT</div>
            <div className="text-xs tracking-wide">CARLO ACUTIS TEAM</div>
          </div>
        </Link>

        {/* Hamburger Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
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
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-wide">
          <ScrollLink
            to="activities"
            className="border border-white px-4 py-2 hover:bg-white hover:text-[#00376C] transition"
          >
            Trang Chủ
          </ScrollLink>
          <ScrollLink
            to="hero"
            className="hover:text-cat-orange transition duration-200"
          >
            Gương Thánh Carlo Acutis
          </ScrollLink>
          <ScrollLink
            to="activities"
            className="hover:text-cat-orange transition duration-200"
          >
            Tin Tức
          </ScrollLink>
          <ScrollLink
            to="training"
            className="hover:text-cat-orange transition duration-200"
          >
            Hoạt Động Từ Thiện
          </ScrollLink>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden mt-4 flex flex-col space-y-2 text-sm font-bold uppercase tracking-wide">
          <ScrollLink
            to="hero"
            onClick={() => setIsOpen(false)}
            className="border border-white px-4 py-2 hover:bg-white hover:text-[#00376C] transition"
          >
            Trang Chủ
          </ScrollLink>
          <ScrollLink
            to="hero"
            onClick={() => setIsOpen(false)}
            className="hover:text-cat-orange transition duration-200"
          >
            Gương Thánh Carlo Acutis
          </ScrollLink>
          <ScrollLink
            to="activities"
            onClick={() => setIsOpen(false)}
            className="hover:text-cat-orange transition duration-200"
          >
            Giới Trẻ
          </ScrollLink>
          <ScrollLink
            to="training"
            onClick={() => setIsOpen(false)}
            className="hover:text-cat-orange transition duration-200"
          >
            Hoạt Động Từ Thiện
          </ScrollLink>
        </nav>
      )}
    </header>
  );
}
