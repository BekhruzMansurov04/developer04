import axios from "axios";

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_API || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default customAxios;

