import axios from "axios";
import type { Blog } from "../models/blog";
import type { User } from "../models/user";
import type { PagedResponse } from "../models/pagedResponse";

axios.defaults.baseURL = "http://localhost:8081/api";

const responseBody = <T>(response: { data: T }) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: unknown) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: unknown) =>
    axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const BlogPosts = {
  list: () => requests.get<PagedResponse<Blog>>("/posts"),
  details: (slug: string) => requests.get<Blog>(`/posts/${slug}`),
};

const Account = {
  login: (body: { username: string; password: string }) =>
    requests.post<User>("/auth/login", body),
};

const agent = {
  BlogPosts,
  Account,
};

export default agent;
