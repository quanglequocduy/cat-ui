import { useState } from "react";

interface EventImage {
  id: number;
  url: string;
  caption: string;
}

export default function EventSlider() {
  const images: EventImage[] = [
    {
      id: 1,
      url: "/logo-dark.png",
      caption: "Chúc mừng Thánh lễ Chúa Giáng Sinh",
    },
    {
      id: 2,
      url: "/logo.png",
      caption: "Nghi thức tại nhà thờ",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="p-6">
      <div className="relative">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].caption}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
          {images[currentIndex].caption}
        </div>
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded"
          onClick={() =>
            setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
          }
        >
          &lt;
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
