/*
 * Node Modules
 */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/*
 * Custom Modules
 */
import { prismaClient } from "@/application/database.ts";
import { User } from "@prisma/generated/prisma/client.ts";
import { logger } from "@/application/logging.ts";
import { ResponseError } from "@/error/response-error.ts";
import { Validation } from "@/validation/validation.ts";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt.ts";

/*
 * Types
 */
import {
  DataRegisterRequest,
  DataLoginRequest,
  DataUpdateUserRequest,
  responseUser,
} from "@/type/user-type.ts";

/*
 * Validation
 */
import {
  TypeLoginUserRequest,
  TypeRegisterUserRequest,
  UserValidation,
} from "@/validation/user-validation.ts";

export class UserService {
  // Register Service
  static async RegisterService(request: DataRegisterRequest) {
    // Validation Data Register
    const registerRequest: TypeRegisterUserRequest = Validation.validate(
      UserValidation.REGISTER,
      request,
    );

    // Checking User is Exits
    const existingUser = await prismaClient.user.count({
      where: {
        email: request.email,
      },
    });

    if (existingUser == 1) {
      logger.warn(
        `Registration failed: Email already is use - ${request.email}`,
      );
      throw new ResponseError("User is already", 401);
    }

    // Hashing Password with Bcrypt
    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    // Prisma Insert Data in Databases
    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    const data = responseUser(user);
    return data;
  }

  // Login Service
  static async LoginService(request: DataLoginRequest) {
    // Validation Data Login
    const loginRequest: TypeLoginUserRequest = Validation.validate(
      UserValidation.LOGIN,
      request,
    );

    // Check Exitsting User
    let user = await prismaClient.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    if (!user) {
      throw new ResponseError("User not found", 404);
    }

    // Compare Password
    const passwordMatched = await bcrypt.compare(
      loginRequest.password,
      user!.password,
    );

    if (!passwordMatched) {
      throw new ResponseError("Email or Password is wrong", 400);
    }

    // Generate Token Access
    const accessToken: string = await generateAccessToken({
      id: user?.id,
      email: user?.email,
    });

    // Generate Refresh Token
    const refreshToken: string = await generateRefreshToken({
      id: user?.id,
      email: user?.email,
    });
    logger.info("Refresh Token and Access Token Created Successfully!!");

    // Update Refresh Token in Database
    user = await prismaClient.user.update({
      where: { email: loginRequest.email },
      data: {
        token: refreshToken,
      },
    });

    // Return Data
    const data = responseUser(user);
    return { data, refreshToken, accessToken };
  }

  // Get Service
  static async Get(user: User) {
    return responseUser(user);
  }

  // Update Service
  static async Update(user: User, request: DataUpdateUserRequest) {
    const updateRequest: DataUpdateUserRequest = Validation.validate(
      UserValidation.UPDATE,
      request,
    );

    if (updateRequest.name) {
      user.name = updateRequest.name;
    }

    if (updateRequest.password) {
      user.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const result = await prismaClient.user.update({
      where: {
        email: user.email,
      },
      data: user,
    });
    return responseUser(result);
  }

  // Logout Service

  static async Logout(user: User) {
    const result = await prismaClient.user.update({
      where: {
        email: user.email,
      },
      data: {
        token: null,
      },
    });

    return responseUser(result);
  }
}
