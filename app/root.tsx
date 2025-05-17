import { Links, Meta } from "@remix-run/react";
import Header from "~/components/Header";
import styles from "~/tailwind.css";
import Hero from "~/components/Hero";
import { PostsItem } from "~/types/posts";
import PostsSection from "~/components/PostsSection";
import EventSlider from "~/components/EventSlider";
import TrainingSection from "./components/TrainingSection";
import Footer from "./components/Footer";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap",
    },
    { rel: "stylesheet", href: styles },
  ];
}

export default function App() {
  const sampleNews: PostsItem[] = [
    {
      id: 1,
      title: "Bái Đính Đức Thánh Cha - Chuyến đi 27/04",
      description: "Dục Thần Cha trong chuyến đi thanh niên...",
      imageUrl: "/logo-dark.png",
      date: "27/04/2025",
    },
    {
      id: 2,
      title: "Việt Nam mừng lễ Chúa Giáng Sinh",
      description: "Thánh lễ tại nhà thờ chính tòa Mỹ Tho...",
      imageUrl: "/logo-light.png",
      date: "25/12/2024",
    },
  ];

  const sampleTrainings: PostsItem[] = [
    {
      id: 1,
      title: "Cử Nhân Thần Học",
      description:
        "Chương trình Thần học là chương trình đào tạo căn bản của Học Viện, hoạt động theo Quy chế...",
      imageUrl: "/training1.jpg",
      date: "27/04/2025",
    },
    {
      id: 2,
      title: "Cao Học Thần Học",
      description:
        "Chương trình Thần học là chương trình đào tạo căn bản của Học Viện, hoạt động theo Quy chế...",
      imageUrl: "/training2.jpg",
      date: "25/12/2024",
    },
    {
      id: 3,
      title: "Mục vụ",
      description:
        "Chương trình Thần học là chương trình đào tạo căn bản của Học Viện, hoạt động theo Quy chế...",
      imageUrl: "/training3.jpg",
      date: "25/12/2024",
    },
    {
      id: 4,
      title: "Nguồn nghị và Văn hóa",
      description:
        "Chương trình Thần học là chương trình đào tạo căn bản của Học Viện, hoạt động theo Quy chế...",
      imageUrl: "/training4.jpg",
      date: "25/12/2024",
    },
  ];

  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <PostsSection posts={sampleNews} />
          </div>
          <div className="w-full md:w-2/3">
            <EventSlider />
          </div>
        </div>
        <Hero />
        <TrainingSection trainings={sampleTrainings} />
        <Footer />
      </body>
    </html>
  );
}
