/*
 * Node Modules
 */
import "dotenv/config";

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  SECRETE_KEY: process.env.SECRETE_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASES_NAME: process.env.DATABASE_NAME,
  DATABASES_PORT: process.env.DATABASE_PORT,
  DATABASE_HOST: process.env.DATABASE_HOST,
  WHITELIST_ORIGIN: ["http://localhost:3000", "https://takayums.com"],
};

export default config;
