import { Post } from "~/types";

interface PostsSectionProps {
  posts: Post[];
}

export default function PostsSection({ posts }: PostsSectionProps) {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-cat-blue mb-4">Hoạt Động</h2>
      <div className="flex flex-col gap-3">
        {posts.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-md w-full gap-5"
          >
            {/* Hình ảnh bên trái */}
              <img
                src={item.image_url}
                alt={item.title}
                className="w-[84px] h-[80px] object-cover rounded-md"
              />

            {/* Nội dung bên phải */}
            <div className="flex-grow flex flex-col justify-between">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.content}
                </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}