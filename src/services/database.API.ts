import axios from "axios";
import BASE_URL from "../constants/baseUrl";

const DATABASE_API = axios.create({
  baseURL: BASE_URL,
});

export default DATABASE_API;
