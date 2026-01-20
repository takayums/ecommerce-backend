/*
 * Node Modules
 */
import { Response, Request, NextFunction } from "express";

/*
 * Custom Modules
 */
import { UserService } from "@/service/user-service.ts";

/*
 * Types
 */
import {
  CreateUserRequest,
  LoginRequest,
  UpdateUserRequest,
} from "@/model/user-model.ts";
import { UserRequest } from "@/type/user-request.ts";

export class UserController {
  static async Register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.RegisterService(request);
      res.status(200).json({
        data: response,
        message: "User Created",
        status: true,
      });
    } catch (error) {
      next(error);
    }
  }

  static async Login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginRequest = req.body as LoginRequest;
      const response = await UserService.LoginService(request);
      res.cookie("token", response.token, { httpOnly: true });
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async GetUsers(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await UserService.Get(req.user!);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async UpdateUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const response = await UserService.Update(req.user!, request);
      res.status(201).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async Logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      await UserService.Logout(req.user!);
      res.status(200).json({
        data: "OKE",
      });
    } catch (error) {
      next(error);
    }
  }
}
