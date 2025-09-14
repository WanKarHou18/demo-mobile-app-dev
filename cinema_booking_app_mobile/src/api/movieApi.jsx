import axios from "axios";
import { BASE_URL } from "../constants/Config";

const api = {
  fetchMovies: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movies`);
      return response.data;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || "Failed to fetch movies"
      );
    }
  },
};

export default api;
