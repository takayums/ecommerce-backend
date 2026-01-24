/*
 * Node Modules
 */
import { Request, NextFunction, Response } from "express";

/*
 * Custom Modules
 */
import { prismaClient } from "@/application/database.ts";
import { logger } from "@/application/logging.ts";
import { verifyAccessToken } from "@/lib/jwt.ts";

/*
 * Types
 */
import jwt, { JwtPayload } from "jsonwebtoken";
const { JsonWebTokenError, TokenExpiredError } = jwt;

export const authanticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Get Access token From Req Heder Authorization
  const token = req.headers.authorization;

  // Get String Access Token from "Bearer Token"
  const arrayAccessToken = token?.split(" ") as string[];
  const accessToken = arrayAccessToken[arrayAccessToken.length - 1];

  // Unauthorize
  if (!accessToken) {
    res.status(401).json({ errors: "Unauthorized" });
    logger.warn("Unauthorized");
    return;
  }

  try {
    // Fucntion Verify Token
    const decode = (await verifyAccessToken(accessToken)) as JwtPayload;
    req.user = decode?.data;
    return next();
  } catch (error) {
    // Token Expired
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ errors: "Token is expired" });
      logger.warn("Token is expired");
      return;
    }
    // Token Invalid
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({ errors: "Access Token Invalid" });
      logger.warn("Access Token Invalid");
      return;
    }
    next(error);
  }
};
