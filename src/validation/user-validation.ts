/*
 * Node Modules
 */
import * as z from "zod";

export class UserValidation {
  static readonly REGISTER = z.object({
    name: z.string().min(1).max(100),
    email: z.string(),
    password: z.string().min(1).max(100),
  });

  static readonly LOGIN = z.object({
    email: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
  });

  static readonly UPDATE = z.object({
    name: z.string().min(1).max(100).optional(),
    password: z.string().min(1).max(100).optional(),
  });
}

export type TypeRegisterUserRequest = z.infer<typeof UserValidation.REGISTER>;
export type TypeLoginUserRequest = z.infer<typeof UserValidation.LOGIN>;
export type TypeUpdateUserRequest = z.infer<typeof UserValidation.UPDATE>;
