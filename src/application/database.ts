import { PrismaClient } from "@prisma/generated/prisma/client.ts";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { logger } from "@/application/logging.ts";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});
const prismaClient = new PrismaClient({
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
