import { PostsItem } from "~/types/posts";

interface PostsSectionProps {
  posts: PostsItem[];
}

export default function PostsSection({ posts }: PostsSectionProps) {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-cat-blue mb-4">Hoạt Động</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <p className="text-gray-400 text-xs mt-2">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
