/*
 * Node Mdouels
 * */
import * as z from "zod";

export class ProductValidation {
  static readonly CREATEPRODUCT = z.object({
    name: z.string().min(3).max(20),
    description: z.string().min(5).max(50),
    thumbnail: z.object({
      publicId: z.string(),
      url: z.url({
        hostname: /^res.cloudinary\.com$/,
        protocol: /^https$/,
      }),
      width: z.int(),
      height: z.int(),
    }),
    galley: z
      .array(
        z.object({
          publicId: z.string(),
          url: z.url({
            hostname: /^res.cloudinary\.com$/,
            protocol: /^https$/,
          }),
          width: z.int(),
          height: z.int(),
        }),
      )
      .optional(),
    price: z.preprocess((val) => Number(val), z.int()),
    size: z.string(),
    quantity: z.preprocess((val) => Number(val), z.int()),
    stock: z.preprocess((val) => Number(val), z.int()),
    categoryId: z.preprocess((val) => Number(val), z.int()),
  });
  static readonly UPDATEPRODUCT = z.object({
    name: z.string().min(3).max(20).optional(),
    description: z.string().min(5).max(50).optional(),
    thumbnail: z
      .object({
        publicId: z.string(),
        url: z.url({
          hostname: /^res.cloudinary\.com$/,
          protocol: /^https$/,
        }),
        width: z.int(),
        height: z.int(),
      })
      .optional(),
    galley: z
      .array(
        z.object({
          publicId: z.string(),
          url: z.url({
            hostname: /^res.cloudinary\.com$/,
            protocol: /^https$/,
          }),
          width: z.int(),
          height: z.int(),
        }),
      )
      .optional(),
    price: z.preprocess((val) => Number(val), z.int()).optional(),
    size: z.string().optional(),
    quantity: z.preprocess((val) => Number(val), z.int()).optional(),
    stock: z.preprocess((val) => Number(val), z.int()).optional(),
    categoryId: z.preprocess((val) => Number(val), z.int()).optional(),
  });
}

export type TypeCreateProduct = z.infer<typeof ProductValidation.CREATEPRODUCT>;
export type TypeUpdateProduct = z.infer<typeof ProductValidation.UPDATEPRODUCT>;
