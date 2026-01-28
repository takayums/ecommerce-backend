/*
 * Custom Modules
 * */
import { ProductService } from "@/service/product-service.ts";
import { logger } from "@/application/logging.ts";

/*
 * Types
 * */
import { Response, Request, NextFunction } from "express";
import {
  DataProductRequest,
  DataUpdateProductRequest,
} from "@/type/product-type.ts";

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

      // Logger
      logger.info("Product Created");

      // Return Response
      res.status(201).json({
        data: product,
        status: true,
        message: "Product Created",
      });
    } catch (error) {
      logger.warn("Created Product Failed");
      next(error);
    }
  }

  // Get All Products
  static async GetAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      // Service Get All Products
      const allProducts = await ProductService.GetAllProducts();

      // Response From Service Product
      const data = { product: allProducts };

      // Logger
      logger.info("Get All Products");

      // Return Response
      res.status(200).json({
        data: data,
        status: true,
        message: "Get All Products",
      });
    } catch (error) {
      logger.warn("Get All Products Failed");
      next(error);
    }
  }

  // Get Detail Product
  static async GetDetailProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      // Req.Params id
      const id = req.params.id;
      // Service Get Detail Product
      const product = await ProductService.GetDetailProduct(Number(id));

      // Logger
      logger.info("Get Detail Product");

      // Return Response
      const data = { product: product };
      res.status(200).json({
        data: data,
        status: true,
        message: "Get Detail Product",
      });
    } catch (error) {
      logger.warn("Get Detail Products Failed");
      next(error);
    }
  }

  // Update Product
  static async UpdateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      // Req.Body For Update Data
      const request = req.body as DataUpdateProductRequest;
      const id = req.params.id;
      // Service Update Product
      const product = await ProductService.UpdateProduct(Number(id), request);

      // Logger
      logger.info("Product Updated");

      // Reeponse
      const data = { product: product };
      res.status(200).json({
        data: data,
        status: true,
        message: "Product Updated",
      });
    } catch (error) {
      logger.warn("Update Products Failed");
      next(error);
    }
  }

  // Delete Product
  static async DeleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      // Req.Params Id
      const id = req.params.id;

      // Service Delete Product
      const product = await ProductService.DeleteProduct(Number(id));

      // Logger
      logger.info("Product Deleted");

      // Response
      const data = { product: product };
      res.status(200).json({
        data: data,
        status: true,
        message: "Product Deleted",
      });
    } catch (error) {
      logger.warn("Deleted Product Failed");
      next(error);
    }
  }
}
