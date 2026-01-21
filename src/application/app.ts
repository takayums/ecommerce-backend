/*
 * Node Modules
 */
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";

/*
 * Custom Modules
 */
import { errorMiddleware } from "@/middleware/error-middleware.ts";
import { publicRouter } from "@/route/public-api.ts";
import { apiRouter } from "@/route/api.ts";
import config from "@/lib/config.ts";
import { logger } from "./logging.ts";

/*
 * Types
 */
import type { CorsOptions } from "cors";

export const app = express();

const whiteList = config.WHITELIST_ORIGIN;
const corsOpration: CorsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      whiteList.includes(origin) ||
      config.NODE_ENV == "development"
    ) {
      callback(null, true);
    } else {
      callback(new Error(`CORS error: ${origin} not allowed in CORS`), false);
      logger.warn(`CORS error: ${origin} not allowed in CORS`);
    }
  },
  credentials: true,
};

// Cors Middleware
app.use(cors(corsOpration));

// Json body
app.use(express.json());

// Access Cookies Browser
app.use(cookieParser());

// Compression Rersponse
app.use(compression());

// Helmet to enhance security HTTP Header
app.use(helmet());

// Api Routes
app.use(publicRouter);
app.use(apiRouter);

// Error Middleware
app.use(errorMiddleware);
