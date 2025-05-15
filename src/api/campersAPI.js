// src/api/campersAPI.js
import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const getAllCampers = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getCamperById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};
