import axios from "axios";

const API_URL = "https://fakerapi.it/api/v1";

export default {
  async getProducts(categoryType, quantity) {
    try {
      const response = await axios.get(`${API_URL}/products`, {
        params: {
          _quantity: quantity || 35,
          _categories_type: categoryType || "uuid",
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      throw new Error("An error occurred while fetching data: " + error);
    }
  },
};
