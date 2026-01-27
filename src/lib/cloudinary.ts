/*
 * Node Modules
 * */
import { v2 as cloudinary } from "cloudinary";
import config from "./config.ts";

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_SECRET,
});

export const uploadToCloudinary = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "products",
  });
};
