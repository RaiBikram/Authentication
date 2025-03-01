import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/user`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This sends cookies with requests
});
