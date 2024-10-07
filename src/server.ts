import { Config } from "./config/index";
import app from "./app";

const startServer = () => {
   const PORT = Config.PORT;
   try {
      app.listen(PORT, () => {
         console.log(`Listening to PORT, ${PORT}`);
      });
   } catch (err) {
      console.log(err);
      process.exit(1);
   }
};

startServer();
