import Hero from "~/components/Hero";
import { PostsItem, EventImage } from "~/types";
import PostsSection from "~/components/PostsSection";
import EventSlider from "~/components/EventSlider";
import TrainingSection from "~/components/TrainingSection";

export default function Index() {
  const sampleNews: PostsItem[] = [
    {
      id: 1,
      title: "Bái Đính Đức Thánh Cha - Chuyến đi 27/04",
      description: "Dục Thần Cha trong chuyến đi thanh niên...",
      imageUrl: "/news1.jpg", // Cập nhật ảnh
      date: "27/04/2025",
    },
    {
      id: 2,
      title: "Việt Nam mừng lễ Chúa Giáng Sinh",
      description: "Thánh lễ tại nhà thờ chính tòa Mỹ Tho...",
      imageUrl: "/news2.jpg", // Cập nhật ảnh
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

  const images: EventImage[] = [
    {
      id: 1,
      url: "/event1.jpg", // Cập nhật ảnh
      caption: "Chúc mừng Thánh lễ Chúa Giáng Sinh",
    },
    {
      id: 2,
      url: "/event2.jpg", // Cập nhật ảnh
      caption: "Nghi thức tại nhà thờ",
    },
  ];

  return (
    <div className="mx-4 md:mx-48 pointer-events-auto" style={{ zIndex: 10 }}>
      <div className="flex flex-col md:flex-row gap-6">
        <div
          className="w-full md:w-1/3 pointer-events-auto"
          style={{ zIndex: 10 }}
        >
          <PostsSection posts={sampleNews} />
        </div>
        <div
          className="w-full md:w-2/3 pointer-events-auto"
          style={{ zIndex: 20 }}
        >
          <EventSlider images={images} />
        </div>
      </div>
      <button
        className="mt-4 bg-blue-500 text-white p-2 rounded pointer-events-auto"
        onClick={() => alert("Test click")}
      >
        Test Click
      </button>
      <Hero />
      <TrainingSection trainings={sampleTrainings} />
    </div>
  );
}
