import axios from "axios";

const API_URL = "https://fakerapi.it/api/v1";
export default {
  async getProducts(params = {}) {
    try {
      const response = await axios.get(`${API_URL}/products`, {
        params: {
          _quantity: params.quantity || 100,
          _price_min: params.minPrice || null,
          _price_max: params.maxPrice || null,
          _tag: params.tag || null,
          _categories_type: "uuid",
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      throw new Error("An error occurred while fetching data: " + error);
    }
  },
};
