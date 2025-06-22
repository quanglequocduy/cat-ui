export type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  category_id: number;
  author_id: number;
  status: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
};
