import { Post } from "~/types";

interface TrainingSectionProps {
  trainings: Post[];
}

export default function TrainingSection({ trainings }: TrainingSectionProps) {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-cat-blue mb-4">
        Chương Trình Đào Tạo
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trainings.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <a
          href="#join"
          className="bg-cat-orange text-white px-6 py-2 rounded hover:bg-orange-600"
        >
          Tham Gia Nhóm CAT
        </a>
      </div>
    </section>
  );
}
