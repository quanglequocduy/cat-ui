import { Post } from "~/types";

interface PostsSectionProps {
  posts: Post[];
}

export default function PostsSection({ posts }: PostsSectionProps) {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-cat-blue mb-4">Hoạt Động</h2>
      <div className="space-y-4">
        {posts.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-md"
          >
            {/* Hình ảnh bên trái */}
            <div className="w-full md:w-3/12 h-48 md:h-auto">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Nội dung bên phải */}
            <div className="w-full md:w-9/12 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mt-2">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}