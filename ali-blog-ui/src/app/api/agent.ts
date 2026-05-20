import axios from "axios";
import type { Blog } from "../models/blog";

import type { PagedResponse } from "../models/pagedResponse";
import type { LoginResponse } from "../models/loginResponse";
import type { MessageResponse } from "../models/messageResponse";
import type {
  CreatePostRequest,
  UpdatePostRequest,
} from "../models/createPostRequest";
axios.defaults.baseURL = "http://localhost:8081/api";

const responseBody = <T>(response: { data: T }) => response.data;

axios.interceptors.request.use((config) => {
  const user = localStorage.getItem("blog_user");

  if (user) {
    const parsedUser = JSON.parse(user);

    if (parsedUser.token) {
      config.headers.Authorization = `Bearer ${parsedUser.token}`;
    }
  }
  return config;
});

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: unknown) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: unknown) =>
    axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
  patch: <T>(url: string, body?: unknown) =>
    axios.patch<T>(url, body).then(responseBody),
};

const BlogPosts = {
  list: () => requests.get<PagedResponse<Blog>>("/posts"),
  details: (slug: string) => requests.get<Blog>(`/posts/${slug}`),
};

const Account = {
  login: (body: { email: string; password: string }) =>
    requests.post<LoginResponse>("/auth/login", body),
};

const Newsletter = {
  subscribe: (body: { email: string }) =>
    requests.post<MessageResponse>("/newsletter/subscribe", body),
};

const AdminPosts = {
  list: () => requests.get<PagedResponse<Blog>>("/admin/posts"),
  details: (slug: string) => requests.get<Blog>(`/admin/posts/${slug}`),
  create: (body: CreatePostRequest) =>
    requests.post<Blog>("/admin/posts", body),
  update: (slug: string, body: UpdatePostRequest) =>
    requests.put<Blog>(`/admin/posts/${slug}`, body),
  publish: (slug: string) =>
    requests.patch<Blog>(`/admin/posts/${slug}/publish`),
  unpublish: (slug: string) =>
    requests.patch<Blog>(`/admin/posts/${slug}/unpublish`),
  delete: (slug: string) => requests.delete<void>(`/admin/posts/${slug}`),
};

const agent = {
  BlogPosts,
  Account,
  Newsletter,
  AdminPosts,
};

export default agent;
