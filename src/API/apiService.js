import axios from "axios";

const API_URL = "https://fakerapi.it/api/v1";

export default {
  async getProducts() {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response;
    } catch (error) {
      throw new Error("An error occurred while fetching data: " + error);
    }
  },
};
