export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  categoryName: string;
  categorySlug: string;
}