/*
 * Node Modules
 */
import { Request } from "express";

import { User } from "@prisma/generated/prisma/client.ts";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
