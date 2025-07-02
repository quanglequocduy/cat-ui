import { Link } from "@remix-run/react";
import { Post } from "~/types";

interface HeroProps {
  post: Post;
}

export default function Hero({ post }: HeroProps) {
  if (!post) return null;

  return (
    <section id="hero" className="p-6 md:p-8 mb-4">
      {/* Phần "Giới thiệu" */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-cat-blue">Giới thiệu</h2>
        <hr className="mt-2 border-t-2 border-cat-blue w-16" />
      </div>

      {/* Phần còn lại */}
      <Link
        to={`/posts/${post.slug}`}
        className="flex flex-col md:flex-row gap-6 items-center hover:shadow-lg transition-shadow duration-200 rounded-lg p-4 -m-4"
      >
        {/* Hình ảnh */}
        <div className="w-full md:w-1/3">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Tiêu đề và nội dung */}
        <div className="w-full md:w-2/3">
          <h2 className="text-xl md:text-2xl font-bold text-cat-blue hover:text-cat-orange transition-colors">
            {post.title}
          </h2>

          <div
            className="mt-2 text-sm md:text-base text-gray-700 line-clamp-3 prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </Link>
    </section>
  );
}
