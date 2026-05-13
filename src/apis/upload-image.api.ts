import axios from "axios";
import { CLOUD_NAME } from "../configs/config";

const api = `https://api.cloudinary.com/v1_1/dashhtfz5/image/upload`;

export const uploadImageApi = async (formData: FormData) => {
  const response = await axios.post(api, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
