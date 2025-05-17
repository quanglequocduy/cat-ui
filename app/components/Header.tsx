import { useState } from "react";
import { Link } from "@remix-run/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-cat-blue text-white p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo-dark.png" alt="CAT Logo" className="h-12 mr-2" />
          <span className="text-sm">Carlo Acutis Team</span>
        </div>
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
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-cat-orange">
            Trang Chủ
          </Link>
          <Link to="/gioi-thieu" className="hover:text-cat-orange">
            Giới Thiệu Thánh Carlo Acutis
          </Link>
          <Link to="/hoat-dong" className="hover:text-cat-orange">
            Hoạt Động Giới Trẻ
          </Link>
          <Link to="/dao-tao" className="hover:text-cat-orange">
            Chuong Trình Đào Tạo
          </Link>
        </nav>
        <a
          href="#join"
          className="hidden md:block bg-cat-orange text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Tham Gia Nhóm CAT
        </a>
      </div>
      {isOpen && (
        <nav className="md:hidden mt-4 flex flex-col space-y-2">
          <Link to="/" className="hover:text-cat-orange">
            Trang Chủ
          </Link>
          <Link to="/gioi-thieu" className="hover:text-cat-orange">
            Giới Thiệu Thánh Carlo Acutis
          </Link>
          <Link to="/hoat-dong" className="hover:text-cat-orange">
            Hoạt Động Giới Trẻ
          </Link>
          <Link to="/dao-tao" className="hover:text-cat-orange">
            Chương Trình Đào Tạo
          </Link>
          <a
            href="#join"
            className="bg-cat-orange text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Tham Gia Nhóm CAT
          </a>
        </nav>
      )}
    </header>
  );
}
