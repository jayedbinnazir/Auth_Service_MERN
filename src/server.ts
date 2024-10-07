import { Config } from "./config/index";
import app from "./app";
import logger from "./config/logger";

const startServer = async () => {
   const PORT = Config.PORT;
   try {
      app.listen(PORT, () => {
         logger.info(`Listening to PORT, ${PORT}`);
      });
   } catch (err: unknown) {
      if (err instanceof Error) {
         logger.error(err.message);
         setTimeout(() => {
            process.exit(1);
         }, 1000);
      }
   }
};

startServer();
