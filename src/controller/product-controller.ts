/*
 * Node Modules
 * */
import { Response, Request, NextFunction } from "express";

export class ProductController {
  // Create Product
  static async CreateProduct(req: Request, res: Response, next: NextFunction) {
    res
      .status(201)
      .json({
        data: { product: "oke" },
        status: true,
        message: "Product Created",
      });
  }

  // Read Product
  static async GetProduct() {}

  // Update Product
  static async UpdateProduct() {}

  // Delete Product
  static async DeleteProduct() {}
}
