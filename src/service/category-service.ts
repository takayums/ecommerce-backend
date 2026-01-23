/*
 * custom Modules
 * */
import { prismaClient } from "@/application/database.ts";
import { logger } from "@/application/logging.ts";
import { ResponseError } from "@/error/response-error.ts";

/*
 * Validation
 * */
import { Validation } from "@/validation/validation.ts";
import {
  CategoryValidation,
  TypeCreateCategory,
  TypeUpdateCategory,
} from "@/validation/category-validation.ts";

/*
 * Types
 */
import { DataCategoryRequest, responseCategory } from "@/type/category-type.ts";

export class CategoryService {
  // Create Category
  static async CreateService(request: DataCategoryRequest) {
    // Valdation Data Create Category
    const categoryRequest: TypeCreateCategory = Validation.validate(
      CategoryValidation.CREATECATEGORY,
      request,
    );

    // Prisma Insert Data Category
    const category = await prismaClient.category.create({
      data: categoryRequest,
    });

    logger.info("Category Created");

    // Return Service Category
    const data = responseCategory(category);
    return data;
  }

  // Get All Category
  static async GetAllCategory() {
    // Prisma Get Data
    const allCategory = await prismaClient.category.findMany();
    logger.info("Get All Category");

    // Response
    const data = allCategory;
    return data;
  }

  // Get Detail Category
  static async GetDetailCategory(id: number) {
    // Get Category Based Id
    const category = await prismaClient.category.findUnique({
      where: { id: id },
    });

    logger.info("Get Detail Category");

    // Return Service Category
    const data = category;
    return data;
  }

  // Update Category
  static async UppdateCategory(id: number, dataCategory: { name: string }) {
    // Validation
    const dataUpdateCategory: TypeUpdateCategory = Validation.validate(
      CategoryValidation.UPDATECATEGORY,
      dataCategory,
    );

    // Check Existing Category By Id
    const existingCategory = await prismaClient.category.findUnique({
      where: { id: id },
    });

    if (!existingCategory) {
      throw new ResponseError("Category Not Found", 404);
    }

    // Update Prisma
    const category = await prismaClient.category.update({
      where: { id: id },
      data: { name: dataUpdateCategory.name },
    });
    logger.info("Update Category");

    const data = category;
    return data;
  }

  // Delete Category
  static async DeleteCategory(id: number) {
    // Check Existing Category By Id
    const existingCategory = await prismaClient.category.findUnique({
      where: { id: id },
    });

    if (!existingCategory) {
      throw new ResponseError("Category Not Found", 404);
    }

    // Delete Category By Id
    const category = await prismaClient.category.delete({ where: { id: id } });

    return category;
  }
}
