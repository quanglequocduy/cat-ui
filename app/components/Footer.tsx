import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";

export default function Footer() {
  return (
    <footer className="bg-[#00376C] text-white p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Theo Dõi Chúng Tôi</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cat-orange transition"
            >
              <FaFacebookF className="h-6 w-6" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cat-orange transition"
            >
              <FaYoutube className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Liên Kết</h3>
          <ul className="space-y-2">
            <li>
              <ScrollLink
                to="hero"
                smooth={true}
                duration={500}
                className="hover:text-cat-orange cursor-pointer"
              >
                Trang Chủ
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="about"
                smooth={true}
                duration={500}
                className="hover:text-cat-orange cursor-pointer"
              >
                Giới Thiệu
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="services"
                smooth={true}
                duration={500}
                className="hover:text-cat-orange cursor-pointer"
              >
                Dịch Vụ
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                className="hover:text-cat-orange cursor-pointer"
              >
                Liên Hệ
              </ScrollLink>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-bold mb-2">Liên Hệ</h3>
          <p className="text-sm">Email: contact@carloacutisteam.com</p>
          <p className="text-sm mt-1">Điện thoại: +84 123 456 789</p>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-lg font-bold mb-2">Đăng Ký Nhận Tin</h3>
          <p className="text-sm mb-2">
            Nhận thông tin mới nhất từ Carlo Acutis Team.
          </p>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="p-2 rounded text-black"
            />
            <button
              type="submit"
              className="bg-cat-orange text-white py-2 px-4 rounded hover:bg-orange-600 transition"
            >
              Đăng Ký
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 border-t border-white pt-4 text-center text-sm">
        © 2025 Carlo Acutis Team. All rights reserved.
      </div>
    </footer>
  );
}