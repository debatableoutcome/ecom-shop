import axios from "axios";

const API_URL = "https://fakerapi.it/api/v1";

export default {
  getProducts() {
    return axios.get(`${API_URL}/products`);
  },
};
