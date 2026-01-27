/*
 * Prisma
 */
import { PrismaClient } from "@prisma/generated/prisma/client.ts";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

/*
 * Custom Modules
 */
import { logger } from "@/application/logging.ts";
import config from "@/lib/config.ts";

const adapter = new PrismaMariaDb({
  host: config.DATABASE_HOST,
  user: config.DATABASE_USER,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
  connectionLimit: 5,
});

const prismaClient = new PrismaClient({
  errorFormat: "pretty",
  adapter,
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prismaClient.$on("query", (e) => {
  logger.info(e);
});
prismaClient.$on("error", (e) => {
  logger.error(e);
});
prismaClient.$on("info", (e) => {
  logger.info(e);
});
prismaClient.$on("warn", (e) => {
  logger.warn(e);
});

export { prismaClient };
