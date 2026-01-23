/*
 * Node Modules
 * */
import jwt from "jsonwebtoken";

/*
 * Custom Modules
 * */
import config from "./config.ts";

/*
 * Types
 * */
type DataJwt = {
  id: number;
  email: string;
};

export async function generateAccessToken(data: DataJwt) {
  return jwt.sign({ data }, config.SECRETE_KEY_ACCESSTOKEN, {
    expiresIn: "1h",
    subject: "AccessToken",
  });
}

export async function generateRefreshToken(data: DataJwt) {
  return jwt.sign({ data }, config.SECRETE_KEY_REFRESHTOKEN, {
    expiresIn: "7d",
    subject: "RefreshToken",
  });
}
