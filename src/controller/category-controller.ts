/*
 * Custom Modules
 * */
import { CategoryService } from "@/service/category-service.ts";

/*
 * Types
 * */
import { NextFunction, Request, Response } from "express";
import {
  AllCategoryResponse,
  CategoryResponse,
  DataCategoryRequest,
} from "@/type/category-type.ts";

export class CategoryController {
  // Create Category
  static async CreateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      // Data Request Body
      const request: DataCategoryRequest = req.body as DataCategoryRequest;

      // Service Create Category
      const responseService = await CategoryService.CreateService(request);

      // Responsoe Create Category
      const responseCategory: CategoryResponse = { category: responseService };

      // Response
      res.status(201).json({
        data: responseCategory,
        status: true,
        message: "Category Created",
      });
    } catch (error) {
      next(error);
    }
  }
  // Read All Category
  static async GetAllCategory(req: Request, res: Response, next: NextFunction) {
    try {
      // Service Get Category
      const responseService = await CategoryService.GetAllCategory();

      // Response All Category
      const responseAllCategory: AllCategoryResponse = {
        categories: responseService,
      };

      res.status(200).json({
        data: responseAllCategory,
        status: true,
        message: "Get All Category",
      });
    } catch (error) {
      next(error);
    }
  }

  // Read Detail Category
  static async GetDetailCategory() {}
  // Update Category
  static async UpdateCategory() {}
  // Delete Category
  static async DeleteCategory() {}
}
