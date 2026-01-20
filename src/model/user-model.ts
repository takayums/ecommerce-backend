/*
 * Custom Modules
 */
import { User } from "@prisma/generated/prisma/client.ts";

export type UserResponse = {
  name: string;
  email: string;
  token?: string;
};

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  name?: string;
  password?: string;
};

export function responseUser(user: User): UserResponse {
  return {
    name: user.name,
    email: user.email,
  };
}
