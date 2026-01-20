/*
 * Node Modules
 */
import express from "express";

/*
 * Custom Modules
 */
import { UserController } from "@/controller/user-controller.ts";
import { authMiddleware } from "@/middleware/auth-middleware.ts";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

// User Route
apiRouter.delete("/api/users/current", UserController.Logout);
apiRouter.patch("/api/users/current", UserController.UpdateUser);
apiRouter.get("/api/users/current", UserController.GetUsers);

// Product Route
apiRouter.post("/api/products");
apiRouter.get("/api/products");
apiRouter.patch("/api/products");
apiRouter.delete("/api/products");
