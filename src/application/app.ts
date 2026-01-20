import express from "express";
import cookieParser from "cookie-parser";

import { errorMiddleware } from "@/middleware/error-middleware.ts";
import { publicRouter } from "@/route/public-api.ts";
import { apiRouter } from "@/route/api.ts";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(publicRouter);
app.use(apiRouter);
app.use(errorMiddleware);
