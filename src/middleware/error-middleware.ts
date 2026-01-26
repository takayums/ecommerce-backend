/*
 * Node Modules
 */
import { Response, Request, NextFunction } from "express";
import { ZodError } from "zod";

/*
 * Custom Modules
 */
import { ResponseError } from "@/error/response-error.ts";

/*
 * Types
 * */
import jwt from "jsonwebtoken";
const { JsonWebTokenError, TokenExpiredError } = jwt;

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      errors: `Validation Error : ${JSON.stringify(error)}`,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.statusCode).json({
      errors: error.message,
    });
  } else if (error instanceof TokenExpiredError) {
    res.status(401).json({
      errors: "Token is Expired",
    });
  } else if (error instanceof JsonWebTokenError) {
    res.status(401).json({
      errors: "Token is Invalid",
    });
  } else {
    res.status(500).json({
      errors: error.message,
    });
  }
  next(error);
};
