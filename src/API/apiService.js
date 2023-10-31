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
          _catergories: params.categoryFilter || null,
          _categories_type: "uuid",
        },
      });

      console.log("response:", response.data.data);

      let filteredProducts = response.data.data;

      if (params.minPrice !== null || params.maxPrice !== null) {
        filteredProducts = filteredProducts.filter((product) => {
          const productPrice = parseFloat(product.price);
          let minCondition = true;
          let maxCondition = true;

          if (params.minPrice !== null) {
            const minPrice = parseFloat(params.minPrice);
            minCondition = productPrice >= minPrice;
          }

          if (params.maxPrice !== null) {
            const maxPrice = parseFloat(params.maxPrice);
            maxCondition = productPrice <= maxPrice;
          }

          return minCondition && maxCondition;
        });
      }

      console.log("Filtered products:", filteredProducts);

      response.data.data = filteredProducts;
      return response;
    } catch (error) {
      throw new Error("An error occurred while fetching data: " + error);
    }
  },
};
