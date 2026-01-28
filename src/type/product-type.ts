/*
 * Custom Modules
 * */
import { Product } from "@prisma/generated/prisma/client.ts";

export type DataProductRequest = {
  name: string;
  description: string;
  thumbnail: {
    url: string;
    publicId: string;
    width: number;
    height: number;
  };
  gallery?: {
    url: string;
    publicId: string;
    width: number;
    height: number;
  }[];
  price: number;
  size: string;
  quantity: number;
  stock: number;
  categoryId: number;
};

export type DataUpdateProductRequest = {
  name?: string;
  description?: string;
  thumbnail?: {
    url: string;
    publicId: string;
    width: number;
    height: number;
  };
  gallery?: {
    url: string;
    publicId: string;
    width: number;
    height: number;
  }[];
  price?: number;
  size?: string;
  quantity?: number;
  stock?: number;
  categoryId?: number;
};

export function responseProduct(product: Product) {
  return {
    product,
  };
}
