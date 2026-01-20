/*
 * Custom Modules
 */
import { app } from "@/application/app.ts";
import { logger } from "@/application/logging.ts";
import config from "./lib/config.ts";

const port = config.PORT;

(async () => {
  try {
    app.listen(port, () => {
      logger.info(`Server success running on port http://localhost:${port}`);
    });
  } catch (error) {
    logger.error("Filed to start server", error);
  }
})();
