/*
 * Node Modules
 */
import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          // Jika message adalah objek, ubah ke JSON string
          const msg =
            typeof message === "object" ? JSON.stringify(message) : message;
          // Jika ada metadata lain tampilkan juga
          const metaString = Object.keys(meta).length
            ? JSON.stringify(meta)
            : "";
          return `${timestamp} ${level}: ${msg} ${metaString}`;
        }),
      ),
    }),
  );
}
