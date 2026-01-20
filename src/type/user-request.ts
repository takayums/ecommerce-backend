/*
 * Node Modules
 */
import { Request } from "express";

import { User } from "@prisma/generated/prisma/client.ts";

export interface UserRequest extends Request {
  user?: User;
}
