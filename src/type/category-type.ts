/*
 * Custom Modules
 * */
import { Category } from "@prisma/generated/prisma/client.ts";

export type DataCategoryRequest = {
  name: string;
};

export type AllCategoryResponse = { categories: Category[] };
export type DetailCategoryResponse = { category: Category };

export type CategoryResponse = { category: { name: string } };

export function responseCategory(category: Category) {
  return {
    name: category.name,
  };
}
