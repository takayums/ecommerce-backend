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
import { authanticate, authorize } from "@/middleware/auth-middleware.ts";

export const apiRouter = express.Router();

apiRouter.use(authanticate);

// User Route
apiRouter.delete("/api/users/current", UserController.Logout);
apiRouter.patch("/api/users/current", UserController.UpdateUser);
apiRouter.get("/api/users/current", UserController.GetUsers);

// Category Route
apiRouter.post(
  "/api/category",
  authorize(["ADMIN"]),
  CategoryController.CreateCategory,
);
apiRouter.get("/api/category", CategoryController.GetAllCategory);
apiRouter.get("/api/category/:id", CategoryController.GetDetailCategory);
apiRouter.patch(
  "/api/category/:id",
  authorize(["ADMIN"]),
  CategoryController.UpdateCategory,
);
apiRouter.delete(
  "/api/category/:id",
  authorize(["ADMIN"]),
  CategoryController.DeleteCategory,
);

// Product Route
apiRouter.post("/api/products");
apiRouter.get("/api/products");
apiRouter.patch("/api/products");
apiRouter.delete("/api/products");
