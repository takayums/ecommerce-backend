import { User } from "@prisma/generated/prisma/client.ts";

export type DataRegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type DataLoginRequest = {
  email: string;
  password: string;
};

export type DataUpdateUserRequest = { name?: string; password?: string };

export type RegisterResponse = {
  user: { name: string; email: string };
};

export type LoginResponse = {
  user: { name: string; email: string; role: string };
  accessToken: string;
};

export function responseUser(user: User) {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
