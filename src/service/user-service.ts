import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prismaClient } from "@/application/database.ts";
import { logger } from "@/application/logging.ts";

import {
  CreateUserRequest,
  LoginRequest,
  responseUser,
  UpdateUserRequest,
} from "@/model/user-model.ts";

import { ResponseError } from "@/error/response-error.ts";
import { Validation } from "@/validation/validation.ts";
import {
  TypeLoginUserRequest,
  TypeRegisterUserRequest,
  UserValidation,
  TypeUpdateUserRequest,
} from "@/validation/user-validation.ts";

import { User } from "@prisma/generated/prisma/client.ts";

export class UserService {
  // Register Service
  static async RegisterService(request: CreateUserRequest) {
    const registerRequest: TypeRegisterUserRequest = Validation.validate(
      UserValidation.REGISTER,
      request,
    );
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

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    const data = responseUser(user);
    return data;
  }

  // Login Service
  static async LoginService(request: LoginRequest) {
    const loginRequest: TypeLoginUserRequest = Validation.validate(
      UserValidation.LOGIN,
      request,
    );
    const jwtSecretKey: string = process.env.SECRETE_KEY as string;
    let user = await prismaClient.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    if (!user) {
      throw new ResponseError("User not found", 404);
    }

    const passwordMatched = await bcrypt.compare(
      loginRequest.password,
      user!.password,
    );

    if (!passwordMatched) {
      throw new ResponseError("Email or Password is wrong", 400);
    }

    const token = jwt.sign({ data: user?.email }, jwtSecretKey, {
      expiresIn: "1h",
    });

    user = await prismaClient.user.update({
      where: { email: loginRequest.email },
      data: {
        token: token,
      },
    });

    const data = responseUser(user);
    data.token = user.token!;
    return data;
  }

  // Get Service
  static async Get(user: User) {
    return responseUser(user);
  }
  // Update Service
  static async Update(user: User, request: UpdateUserRequest) {
    const updateRequest: UpdateUserRequest = Validation.validate(
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
