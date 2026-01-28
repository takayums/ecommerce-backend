/*
 * Custom Modules
 * */
import { prismaClient } from "@/application/database.ts";
import { Validation } from "@/validation/validation.ts";
import { logger } from "@/application/logging.ts";

/*
 * Types
 * */
import {
  ProductValidation,
  TypeCreateProduct,
} from "@/validation/product-validation.ts";
import { DataProductRequest, responseProduct } from "@/type/product-type.ts";
import { ResponseError } from "@/error/response-error.ts";

export class ProductService {
  // Create Product
  static async CreateProduct(request: DataProductRequest) {
    // Validation Data Request
    const productRequest: TypeCreateProduct = Validation.validate(
      ProductValidation.CREATEPRODUCT,
      request,
    );

    // Insert Product to Prisma
    const product = await prismaClient.product.create({ data: productRequest });

    // Return Response Service
    const data = responseProduct(product);
    return data;
  }

  // Get All Product
  static async GetAllProducts() {
    // Get Data From Db With Prisma
    const allProducts = await prismaClient.product.findMany();
    // Return Response Service
    return allProducts;
  }

  // Get Detail Product
  static async GetDetailProduct(id: number) {
    // Params Id
    const productId = id;

    // Get Data From Db with Prisma
    const product = await prismaClient.product.findUnique({
      where: { id: id },
    });

    // If Product Not Found
    if (!product) {
      logger.warn("Product Not Found");
      throw new ResponseError("Product Not Found", 404);
    }

    // Return Response Service
    const data = product;
    return data;
  }

  // Update Product
  static async UpdateProduct() {}

  // Delete Product
  static async DeleteProduct() {}
}
