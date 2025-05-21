import { useState } from "react";
import { Post } from "~/types";

interface EventSliderProps {
  images: Post[];
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
    <section>
      <div className="relative max-w-full mx-auto" style={{ zIndex: 50 }}>
        {/* Image */}
        <img
          key={currentIndex}
          src={images[currentIndex].image_url}
          alt={images[currentIndex].title}
          className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg"
          style={{ zIndex: 0 }}
        />

        {/* Title Overlay */}
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded text-sm sm:text-base md:text-lg"
          style={{ zIndex: 10 }}
        >
          {images[currentIndex].title}
        </div>

        {/* Previous Button */}
        <button
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 sm:p-3 rounded-full hover:bg-opacity-80 transition pointer-events-auto cursor-pointer"
          style={{ zIndex: 40 }}
          onClick={handlePrevious}
          aria-label="Previous image"
          type="button"
        >
          &lt;
        </button>

        {/* Next Button */}
        <button
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 sm:p-3 rounded-full hover:bg-opacity-80 transition pointer-events-auto cursor-pointer"
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