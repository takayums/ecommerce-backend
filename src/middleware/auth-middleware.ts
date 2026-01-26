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
import { ResponseError } from "@/error/response-error.ts";

/*
 * Types
 */
import jwt, { JwtPayload } from "jsonwebtoken";
const { JsonWebTokenError, TokenExpiredError } = jwt;

// Authenticate User
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Get Access token From Req Heder Authorization
  const token = req.headers.authorization;

  // Get String Access Token from "Bearer Token"
  const arrayAccessToken = token?.split(" ") as string[];
  const accessToken =
    arrayAccessToken && arrayAccessToken[arrayAccessToken.length - 1];

  // Unauthorize
  if (!accessToken) {
    logger.warn("Unauthorized");
    return next(new ResponseError("Unauthorized", 401));
  }

  try {
    // Fucntion Verify Token
    const decode = (await verifyAccessToken(accessToken)) as JwtPayload;
    req.user = decode?.data;
    return next();
  } catch (error) {
    next(error);
  }
};

// Authorize User
type AuthRole = "ADMIN" | "USER";
export const authorize = (roles: AuthRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check Exist User in Db
      const userId = req.user.id;
      const user = await prismaClient.user.findUnique({
        where: { id: userId },
      });

      // User Not Found
      if (!user) {
        logger.warn("Not Found User");
        return next(new ResponseError("Not Found User", 404));
      }

      // Check Role User
      if (!roles.includes(user.role)) {
        logger.warn("Authorization Error, User Denided");
        return next(
          new ResponseError("Authorization Error, User Denided", 403),
        );
      }
      return next();
    } catch (error) {
      next(error);
    }
  };
};
