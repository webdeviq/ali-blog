export interface CreatePostRequest  {
    title: string;
    content: string;
    excerpt: string;
    categorySlug: string;
}

export type UpdatePostRequest = CreatePostRequest;