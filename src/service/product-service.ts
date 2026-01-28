/*
 * Custom Modules
 * */
import { prismaClient } from "@/application/database.ts";
import { Validation } from "@/validation/validation.ts";
import { logger } from "@/application/logging.ts";
import { ResponseError } from "@/error/response-error.ts";

/*
 * Types
 * */
import {
  ProductValidation,
  TypeCreateProduct,
  TypeUpdateProduct,
} from "@/validation/product-validation.ts";
import {
  DataProductRequest,
  DataUpdateProductRequest,
  responseProduct,
} from "@/type/product-type.ts";

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
  static async UpdateProduct(id: number, request: DataUpdateProductRequest) {
    // Validation Data Request
    const productRequest: TypeUpdateProduct = Validation.validate(
      ProductValidation.UPDATEPRODUCT,
      request,
    );

    // Check Product Existing
    const existingProduct = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      logger.warn("Product Not Found");
      throw new ResponseError("Product Not Found", 404);
    }

    // Update Data in Databases
    const product = await prismaClient.product.update({
      data: productRequest,
      where: { id },
    });

    // Return Response
    const data = product;
    return data;
  }

  // Delete Product
  static async DeleteProduct(id: number) {
    // Check Product Existing
    const existingProduct = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      logger.warn("Product Not Found");
      throw new ResponseError("Product Not Found", 404);
    }

    // Delete Data In Databases
    const product = await prismaClient.product.delete({ where: { id } });

    // Return Response
    const data = product;
    return data;
  }
}
