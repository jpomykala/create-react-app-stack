module.exports = `import axios from "axios";
import packageJson from "../package.json";

export const LOCAL_STORAGE_TOKEN_KEY = packageJson.name + "_token";
export const API_URL = "http://localhost:8080";

const buildAxios = () => axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    Authorization: "Bearer " + localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
  },
});

export default buildAxios();
`;