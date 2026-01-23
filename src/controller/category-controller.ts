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
  DetailCategoryResponse,
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
  static async GetDetailCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      // Get Id Params Category
      const { id } = req.params;

      // Response Detail Category
      const responseService = await CategoryService.GetDetailCategory(
        Number(id),
      );
      const responseDetailCategory = {
        category: responseService,
      } as DetailCategoryResponse;

      res.status(200).json({
        data: responseDetailCategory,
        status: true,
        message: "Get Detail Category",
      });
    } catch (error) {
      next(error);
    }
  }

  // Update Category
  static async UpdateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      // Get Id Params Category
      const { id } = req.params;
      const name = req.body;

      // Response Update Category
      const category = await CategoryService.UppdateCategory(Number(id), name);

      res.status(200).json({
        data: { category: category },
        status: true,
        message: "Update Category",
      });
    } catch (error) {
      next(error);
    }
  }
  // Delete Category
  static async DeleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      // Get Id Params Category
      const { id } = req.params;

      // Response Category
      const category = await CategoryService.DeleteCategory(Number(id));

      const responseCategory = { category: category };

      res.status(200).json({
        data: responseCategory,
        status: true,
        message: "Delete Data Category",
      });
    } catch (error) {
      next(error);
    }
  }
}
