import { useEffect, useState } from "react";
import { Post, Category } from "~/types";

import Hero from "~/components/Hero";
import PostsSection from "~/components/PostsSection";
import EventSlider from "~/components/EventSlider";
import TrainingSection from "~/components/TrainingSection";

export default function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, postRes] = await Promise.all([
          fetch("https://cat-api-rho.vercel.app/api/categories"),
          fetch("https://cat-api-rho.vercel.app/api/posts"),
        ]);

        if (!catRes.ok || !postRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [catData, postData] = await Promise.all([
          catRes.json(),
          postRes.json(),
        ]);

        setCategories(catData);
        setPosts(postData.filter((post: Post) => post.status === "published"));
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const categoryMap = categories.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, number>);

  const newsPosts = posts.filter(
    (post) => post.category_id === categoryMap["news"]
  );
  const trainingPosts = posts.filter(
    (post) => post.category_id === categoryMap["training"]
  );
  const eventPosts = posts.filter(
    (post) =>
      post.category_id === categoryMap["event"] ||
      post.category_id === categoryMap["gallery"]
  );
  const heroPosts = posts.filter(
    (post) => post.category_id === categoryMap["hero"]
  );

  const heroPost = heroPosts.length > 0 ? heroPosts[0] : null;

  return (
    <div className="mx-4 md:mx-48 pointer-events-auto" style={{ zIndex: 10 }}>
      <section className="mt-4">
        <div className="pl-6">
          <h2 className="text-2xl font-bold text-cat-blue">Tin tức</h2>
          <hr className="mt-2 border-t-2 border-cat-blue w-16" />
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-stretch p-6">
          <div className="flex flex-col md:flex-row gap-6 p-6">
            <div className="w-full md:w-1/3">
              <PostsSection posts={newsPosts} />
            </div>
            <div className="w-full md:w-2/3">
              <EventSlider images={eventPosts} />
            </div>
          </div>
        </div>
      </section>

      {heroPost && <Hero post={heroPost} />}

      <TrainingSection trainings={trainingPosts} />
    </div>
  );
}
