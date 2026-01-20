/*
 * Node Modules
 */
import { NextFunction, Response } from "express";

/*
 * Custom Modules
 */
import { prismaClient } from "@/application/database.ts";

/*
 * Types
 */
import { UserRequest } from "@/type/user-request.ts";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;
  if (token) {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });

    if (user) {
      req.user = user;
      next();
      return;
    }
  }

  res
    .status(401)
    .json({
      errors: "Unauthorized",
    })
    .end();
};
