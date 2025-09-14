import axios from "axios";
import { BASE_URL } from "../constants/Config";

const api = {
  fetchProfileInfo: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/profile_info`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Failed to fetch data");
    }
  },
};

export default api;
