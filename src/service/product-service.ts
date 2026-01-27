/*
 * Custom Modules
 * */
import { prismaClient } from "@/application/database.ts";
import { Validation } from "@/validation/validation.ts";

/*
 * Types
 * */
import {
  ProductValidation,
  TypeCreateProduct,
} from "@/validation/product-validation.ts";
import { DataProductRequest, responseProduct } from "@/type/product-type.ts";

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

  // Read Product
  static async GetProduct() {}

  // Update Product
  static async UpdateProduct() {}

  // Delete Product
  static async DeleteProduct() {}
}
