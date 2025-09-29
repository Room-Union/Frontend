import { BASE_URL, TEST_BASE_URL } from "@/constants/api";
import axios from "axios";

const test = axios.create({
  baseURL: TEST_BASE_URL,
});

const api = axios.create({
  baseURL: BASE_URL,
});

export { api, test };
