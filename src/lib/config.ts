/*
 * Node Modules
 */
import "dotenv/config";

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  SECRETE_KEY_ACCESSTOKEN: process.env.SECRETE_KEY_ACCESSTOKEN as string,
  SECRETE_KEY_REFRESHTOKEN: process.env.SECRETE_KEY_REFRESHTOKEN as string,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_HOST: process.env.DATABASE_HOST,
  WHITELIST_ORIGIN: ["http://localhost:3000", "https://takayums.com"],
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
};

export default config;
