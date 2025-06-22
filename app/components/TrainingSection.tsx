import { Post } from "~/types";

interface TrainingSectionProps {
  trainings: Post[];
}

export default function TrainingSection({ trainings }: TrainingSectionProps) {
  return (
    <section id="training" className="p-6 md:p-8 mb-4">
      {/* Phần "Chương trình đào tạo" */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-cat-blue">
          Chương trình đào tạo
        </h2>
        <hr className="mt-2 border-t-2 border-cat-blue w-16" />
      </div>

      {/* Phần còn lại */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trainings.map((item) => (
          <div key={item.id} className="border overflow-hidden shadow-md">
            <div className="border rounded-lg">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <div
                className="prose text-gray-700 mt-2"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <a
          href="#join"
          className="bg-cat-orange text-white px-6 py-2 hover:bg-orange-600"
        >
          Tham Gia Nhóm CAT
        </a>
      </div>
    </section>
  );
}
