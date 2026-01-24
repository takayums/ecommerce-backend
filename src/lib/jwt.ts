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
  role: "USER" | "ADMIN";
};

// Generate Access Token
export async function generateAccessToken(data: DataJwt) {
  return jwt.sign({ data }, config.SECRETE_KEY_ACCESSTOKEN, {
    expiresIn: "1h",
    subject: "AccessToken",
  });
}

// Generate Access Refresh Token
export async function generateRefreshToken(data: DataJwt) {
  return jwt.sign({ data }, config.SECRETE_KEY_REFRESHTOKEN, {
    expiresIn: "7d",
    subject: "RefreshToken",
  });
}

// Verify Access Token
export async function verifyAccessToken(token: string) {
  return jwt.verify(token, config.SECRETE_KEY_ACCESSTOKEN);
}
