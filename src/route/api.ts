/*
 * Node Modules
 */
import express from "express";

/*
 * Custom Modules
 */
import { UserController } from "@/controller/user-controller.ts";
import { CategoryController } from "@/controller/category-controller.ts";

/*
 * Middleware
 * */
import { authMiddleware } from "@/middleware/auth-middleware.ts";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

// User Route
apiRouter.delete("/api/users/current", UserController.Logout);
apiRouter.patch("/api/users/current", UserController.UpdateUser);
apiRouter.get("/api/users/current", UserController.GetUsers);

// Category Route
apiRouter.post("/api/category", CategoryController.CreateCategory);
apiRouter.get("/api/category", CategoryController.GetAllCategory);
apiRouter.get("/api/category/:id");
apiRouter.get("/api/category/:id");
apiRouter.patch("/api/category/:id");
apiRouter.delete("/api/category/:id");

// Product Route
apiRouter.post("/api/products");
apiRouter.get("/api/products");
apiRouter.patch("/api/products");
apiRouter.delete("/api/products");
