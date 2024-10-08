import express, { NextFunction, Request, Response } from "express";
import logger from "./config/logger";
import { HttpError } from "http-errors";

const app = express();

app.get("/", async (req, res) => {
   // const err = CreateError(401, "unauthorized user");
   // return next(err);
   res.send("auth-service ");
});

//error handler

// eslint-disable-next-line no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
   logger.error(err.message);
   const statusCode = err.statusCode || 500;

   res.status(statusCode).json({
      errors: [
         {
            type: err.name,
            msg: err.message,
            location: "",
            path: "",
         },
      ],
   });
});

export default app;
