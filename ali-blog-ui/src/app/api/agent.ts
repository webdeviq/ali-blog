import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api";

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
  list: () => requests.get("/posts"),
  details: (slug: string) => requests.get(`/posts/${slug}`),
};

const Account = {
  login: (body: { username: string; password: string }) =>
    requests.post("/auth/login", body),
};

const agent = {
  BlogPosts,
  Account,
};

export default agent;
