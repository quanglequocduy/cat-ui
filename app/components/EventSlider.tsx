import { useState } from "react";

interface ImageItem {
  id: number;
  url: string;
  caption: string;
}

interface EventSliderProps {
  images: ImageItem[];
}

export default function EventSlider({ images }: EventSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="p-6 text-center text-red-500">
        Không có hình ảnh để hiển thị
      </div>
    );
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="p-6">
      <div className="relative" style={{ zIndex: 50 }}>
        <img
          key={currentIndex}
          src={images[currentIndex].url}
          alt={images[currentIndex].caption}
          className="w-full h-64 object-cover rounded-lg"
          style={{ zIndex: 0 }}
        />
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
          style={{ zIndex: 10 }}
        >
          {images[currentIndex].caption}
        </div>
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded hover:bg-opacity-80 transition pointer-events-auto cursor-pointer"
          style={{ zIndex: 40 }}
          onClick={handlePrevious}
          aria-label="Previous image"
          type="button"
        >
          &lt;
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded hover:bg-opacity-80 transition pointer-events-auto cursor-pointer"
          style={{ zIndex: 40 }}
          onClick={handleNext}
          aria-label="Next image"
          type="button"
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
