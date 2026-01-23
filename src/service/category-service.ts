/*
 * custom Modules
 * */
import { prismaClient } from "@/application/database.ts";
import { logger } from "@/application/logging.ts";

/*
 * Validation
 * */
import { Validation } from "@/validation/validation.ts";
import {
  CategoryValidation,
  TypeCreateCategory,
} from "@/validation/category-validation.ts";

/*
 * Types
 */
import { DataCategoryRequest, responseCategory } from "@/type/category-type.ts";

export class CategoryService {
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

  static async GetAllCategory() {
    // Prisma Get Data
    const allCategory = await prismaClient.category.findMany();
    logger.info("Get All Category");

    // Response
    const data = allCategory;
    return data;
  }
}
