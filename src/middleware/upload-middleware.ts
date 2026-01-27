/*
 * Custom Modules
 * */
import { logger } from "@/application/logging.ts";
import { ResponseError } from "@/error/response-error.ts";
import { uploadToCloudinary } from "@/lib/cloudinary.ts";

/*
 * Types
 * */
import { Request, Response, NextFunction } from "express";

export const uploadMiddleware = (method: "post" | "put" | "patch") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Skip Method Update and File Does Not Exits
    if ((method === "put" || method === "patch") && !req.file) {
      next();
      return;
    }

    // File Does Not Exits
    if (!req.file) {
      return next(
        new ResponseError("ValidationError, Thumbnail is required", 400),
      );
    }

    if (req.file.size >= 2 * 1024 * 1024) {
      return next(
        new ResponseError(
          "ValidationError, File Images must less than 2MB",
          413,
        ),
      );
    }

    // Handle File Upload with Cloudinary
    try {
      // Upload to Cloudinary
      const filePath = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      // Function Upload to cloudinary
      const uploadResult = await uploadToCloudinary(filePath);
      const newThumbnail = {
        publicId: uploadResult.public_id,
        url: uploadResult.secure_url,
        width: uploadResult.width,
        height: uploadResult.height,
      };

      // Return to req.body;
      req.body.thumbnail = newThumbnail;
      return next();
    } catch (error) {
      logger.warn("Failed Upload Image to Cloudinary");
      next(error);
    }
  };
};
