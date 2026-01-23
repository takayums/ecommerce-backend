/*
 * Node Modules
 */
import * as z from "zod";

export class CategoryValidation {
  static readonly CREATECATEGORY = z.object({
    name: z.string().min(1).max(20),
  });
}

export type TypeCreateCategory = z.infer<
  typeof CategoryValidation.CREATECATEGORY
>;
