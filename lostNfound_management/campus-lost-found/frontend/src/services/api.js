import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export const getItems = () => api.get("/items");
export const getItem = (id) => api.get(`/items/${id}`);
export const createItem = (itemData) => api.post("/items", itemData);
export const updateItem = (id, itemData) => api.put(`/items/${id}`, itemData);
export const deleteItem = (id) => api.delete(`/items/${id}`);

export default api;
