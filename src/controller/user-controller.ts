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
import { UserRequest } from "@/type/user-request.ts";
import {
  DataLoginRequest,
  DataRegisterRequest,
  DataUpdateUserRequest,
  LoginResponse,
  RegisterResponse,
} from "@/type/user-type.ts";

export class UserController {
  // Controller Register
  static async Register(req: Request, res: Response, next: NextFunction) {
    try {
      // Data User from req.body
      const request: DataRegisterRequest = req.body as DataRegisterRequest;

      // Service Register
      const response = await UserService.RegisterService(request);

      // Response Register
      const reponseRegister: RegisterResponse = { user: response };

      // Response
      res.status(200).json({
        data: reponseRegister,
        message: "User Created",
        status: true,
      });
    } catch (error) {
      next(error);
    }
  }

  // Controller Login
  static async Login(req: Request, res: Response, next: NextFunction) {
    try {
      // Data User from req.body
      const request: DataLoginRequest = req.body as DataLoginRequest;

      // Service Login
      const { data, refreshToken, accessToken } =
        await UserService.LoginService(request);

      // Response Login
      const responseLogin: LoginResponse = {
        user: data,
        accessToken: accessToken,
      };

      // Send Token to Cookie
      res.cookie("refreshToken", refreshToken, { httpOnly: true });

      // Response
      res.status(200).json({
        data: responseLogin,
        message: "Login User",
        status: true,
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
      const request: DataUpdateUserRequest = req.body as DataUpdateUserRequest;
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
