import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Post } from "~/types";

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  try {
    // Fetch post by slug using the new API endpoint
    const response = await fetch(
      `https://cat-api-kmk7.onrender.com/api/posts/slug/${slug}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Response("Post not found", { status: 404 });
      }
      throw new Error("Failed to fetch post");
    }

    const post: Post = await response.json();
    return json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    if (error instanceof Response) {
      throw error;
    }
    throw new Response("Error loading post", { status: 500 });
  }
}

export default function PostDetail() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-cat-blue hover:text-cat-orange transition-colors mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Quay về trang chủ
        </Link>

        {/* Post Content */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="w-full h-64 md:h-96">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Post Header */}
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-4xl font-bold text-cat-blue mb-4">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center text-gray-600 text-sm mb-6">
              <time dateTime={post.updated_at}>
                {new Date(post.updated_at).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {/* Post Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-cat-blue prose-links:text-cat-orange hover:prose-links:text-orange-600"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* Related/Back to sections */}
        <div className="mt-8 text-center">
          <Link
            to="/#activities"
            className="inline-block bg-cat-blue text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Xem thêm hoạt động khác
          </Link>
        </div>
      </div>
    </div>
  );
}
