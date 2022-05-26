import axios from "axios";

export const appAxios = axios.create({
  baseURL: "https://yabadev-ecommerce-app.herokuapp.com",
});
