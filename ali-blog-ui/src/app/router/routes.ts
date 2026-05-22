export const routes = {
  home: "/",
  blogs: "/blogs",
  login: "/login",

  admin: "/admin",
  createPost: "/admin/posts/new",
  about: "/about",

  editPost: (slug: string) => `/admin/posts/${slug}/edit`,
  blogDetails: (slug: string) => `/blogs/${slug}`,
};
