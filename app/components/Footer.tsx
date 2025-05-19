export default function Footer() {
  return (
    <footer className="bg-cat-blue text-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo and Slogan */}
        <div>
          <img src="/logo-cat.png" alt="CAT Logo" className="h-16 mb-2" />
          <p className="text-sm">Carlo Acutis Team</p>
          <p className="text-sm mt-1">Theo dõi Carlo Acutis Team</p>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/facebook-icon.png"
                alt="Facebook"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/youtube-icon.png" alt="YouTube" className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/twitter-icon.png" alt="Twitter" className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Liên Kết</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-cat-orange">
                Trang Chủ
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-cat-orange">
                Giới Thiệu
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-cat-orange">
                Dịch Vụ
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-cat-orange">
                Liên Hệ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-bold mb-2">Liên Hệ</h3>
          <p className="text-sm">Email: contact@carloacutisteam.com</p>
          <p className="text-sm mt-1">Điện thoại: +84 123 456 789</p>
          <p className="text-sm mt-1">Địa chỉ: 123 Đường ABC, TP.HCM</p>
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
              className="bg-cat-orange text-white py-2 px-4 rounded hover:bg-orange-600"
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