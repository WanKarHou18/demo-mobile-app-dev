import axios from "axios";
import { BASE_URL } from "../constants/Config";

const api = {
  fetchBookingSetting: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/booking/booking_setting`);
      return response.data;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || "Failed to fetch booking"
      );
    }
  },
};

export default api;
