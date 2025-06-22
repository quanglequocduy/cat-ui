import { Post } from "~/types";

interface PostsSectionProps {
  posts: Post[];
}

export default function PostsSection({ posts }: PostsSectionProps) {
  return (
    <section id="activities">
      <div className="flex flex-col">
        {posts.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-md w-full gap-5 p-2"
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
              <div
                className="prose line-clamp-3 text-gray-700 mt-2"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
