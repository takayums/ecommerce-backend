import "dotenv/config";

import { app } from "@/application/app.ts";
import { logger } from "@/application/logging.ts";

const port = process.env.PORT;

app.listen(port, () => {
  logger.info(`Server success running on port http://localhost:${port}`);
});
