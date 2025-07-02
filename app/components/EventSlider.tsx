import { useState } from "react";
import { Link } from "@remix-run/react";
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
        {/* Clickable Image */}
        <Link to={`/posts/${images[currentIndex].slug}`}>
          <img
            key={currentIndex}
            src={images[currentIndex].image_url}
            alt={images[currentIndex].title}
            className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            style={{ zIndex: 0 }}
          />
        </Link>

        {/* Title Overlay */}
        <Link
          to={`/posts/${images[currentIndex].slug}`}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded text-sm sm:text-base md:text-lg hover:bg-opacity-70 transition-all"
          style={{ zIndex: 10 }}
        >
          {images[currentIndex].title}
        </Link>

        {/* Previous Button */}
        <button
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 sm:p-3 rounded-full hover:bg-opacity-80 transition pointer-events-auto cursor-pointer"
          style={{ zIndex: 40 }}
          onClick={handlePrevious}
          aria-label="Previous image"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Next Button */}
        <button
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 sm:p-3 rounded-full hover:bg-opacity-80 transition pointer-events-auto cursor-pointer"
          style={{ zIndex: 40 }}
          onClick={handleNext}
          aria-label="Next image"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
