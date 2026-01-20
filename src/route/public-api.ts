/*
 * Node Modules
 */
import express from "express";

/*
 * Custom Modules
 */
import { UserController } from "@/controller/user-controller.ts";

export const publicRouter = express.Router();

publicRouter.post("/api/users/register", UserController.Register);
publicRouter.post("/api/users/login", UserController.Login);
