import axios from "axios";
import { BASE_URL } from "../constants/Config";

const api = {
  fetchFoodBeverageItems: async () => {
    try {
      console.log("dada", `${BASE_URL}/foodbeverage/items`);
      const response = await axios.get(`${BASE_URL}/foodbeverage/items`);
      console.log("foodbeverage response", response);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Failed to fetch data");
    }
  },
};

export default api;
