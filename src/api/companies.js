import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

export const fetchCompaniesApi = (params) =>
  api.get("/api/companies", { params }).then((res) => res.data);

export const fetchCompanyFiltersApi = () =>
  api.get("/api/companies/filters").then((res) => res.data);

export default api;
