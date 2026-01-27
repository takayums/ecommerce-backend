/*
 * Custom Modules
 * */
import { ProductService } from "@/service/product-service.ts";

/*
 * Types
 * */
import { Response, Request, NextFunction } from "express";
import { DataProductRequest } from "@/type/product-type.ts";

export class ProductController {
  // Create Product
  static async CreateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      // req.body to use params service
      const request = req.body as DataProductRequest;

      // Service Cretea Product
      const productService = await ProductService.CreateProduct(request);

      // Response Product Service
      const product = { product: productService };

      res.status(201).json({
        data: product,
        status: true,
        message: "Product Created",
      });
    } catch (error) {
      next(error);
    }
  }

  // Read Product
  static async GetProduct() {}

  // Update Product
  static async UpdateProduct() {}

  // Delete Product
  static async DeleteProduct() {}
}
