/*
 * Node Modules
 */
import winston from "winston";

const { combine, errors, json, timestamp, align, colorize, printf } =
  winston.format;

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss A",
    }),
    errors({ stack: true }),
    json(),
  ),
  defaultMeta: { service: "user-service" },
});

// Winston for production
if (process.env.NODE_ENV === "production") {
  logger.add(
    new winston.transports.File({ filename: "error.log", level: "error" }),
  );
  logger.add(new winston.transports.File({ filename: "combined.log" }));
}

// Winsto for development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        align(),
        printf(({ timestamp, level, message, ...meta }) => {
          // Jika message adalah objek, ubah ke JSON string
          const msg =
            typeof message === "object" ? JSON.stringify(message) : message;
          // Jika ada metadata lain tampilkan juga
          const metaString = Object.keys(meta).length
            ? `\n${JSON.stringify(meta)}`
            : "";
          return `${timestamp} [${level}]: ${msg} ${metaString}`;
        }),
      ),
    }),
  );
}
