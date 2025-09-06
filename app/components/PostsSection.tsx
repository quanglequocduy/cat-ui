import { Link } from "@remix-run/react";
import { Post } from "~/types";

interface PostsSectionProps {
  posts: Post[];
}

export default function PostsSection({ posts }: PostsSectionProps) {
  return (
    <section id="activities">
      <div className="flex flex-col">
        {posts.map((item) => (
          <Link
            key={item.id}
            to={`/posts/${item.slug}`}
            className="flex flex-row border rounded-lg overflow-hidden shadow-md w-full gap-4 p-2 hover:shadow-lg hover:border-cat-orange transition-all duration-200 cursor-pointer"
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="w-[84px] h-[80px] object-cover rounded-md flex-shrink-0"
            />

            <div className="flex-1 flex flex-col justify-between">
              <h3 className="text-sm font-semibold hover:text-cat-blue transition-colors line-clamp-2">
                {item.title}
              </h3>
              <div
                className="prose line-clamp-2 text-gray-700 text-xs md:text-sm mt-1 md:mt-2"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
