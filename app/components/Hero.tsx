import { Post } from "~/types";

interface HeroProps {
  post: Post;
}

export default function Hero({ post }: HeroProps) {
  if (!post) return null;
  return (
    <section className="flex flex-col md:flex-row p-4 md:p-6 gap-4 md:gap-6 items-center">
      <div className="w-full md:w-1/3">
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>
      <div className="w-full md:w-2/3">
        <h2 className="text-xl md:text-2xl font-bold text-cat-blue">{post.title}</h2>
        <p className="mt-2 text-sm md:text-base text-gray-700 line-clamp-3">
          {post.content}
        </p>
      </div>
    </section>
  );
}