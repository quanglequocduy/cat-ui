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

        {/* Liên Kết */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Liên Kết</h3>
          <ul className="space-y-1">
            <li>
              <a href="/trang-chu" className="hover:text-cat-orange">
                Trang Chủ
              </a>
            </li>
            <li>
              <a href="/gioi-thieu" className="hover:text-cat-orange">
                Giới Thiệu Thánh Carlo Acutis
              </a>
            </li>
            <li>
              <a href="/hoat-dong" className="hover:text-cat-orange">
                Hoạt Động Giới Trẻ
              </a>
            </li>
            <li>
              <a href="/dao-tao" className="hover:text-cat-orange">
                Chương Trình Đào Tạo
              </a>
            </li>
          </ul>
        </div>

        {/* Thông Tin Liên Hệ */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Thông Tin Liên Hệ</h3>
          <ul className="space-y-1">
            <li className="flex items-center">
              <span className="mr-2">📞</span>
              <span>(+84) 0987 123 456</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">📧</span>
              <span>team@carloacutisteam.com</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">📍</span>
              <span>123 Đường ABC, Phường 8, Quận 3, Tp. Hồ Chí Minh</span>
            </li>
          </ul>
        </div>

        {/* Đăng Ký Nhận Tin */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Đăng Ký Nhận Tin</h3>
          <p className="text-sm mb-2">
            Chứng tỏ sự đắc việt mọi là lời Chúa qua email của bạn.
          </p>
          <div className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Nhập email nhận tin"
              className="p-2 rounded text-black"
            />
            <button className="bg-cat-orange text-white px-4 py-2 rounded hover:bg-orange-600">
              Đăng Ký
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
