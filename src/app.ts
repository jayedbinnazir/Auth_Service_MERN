import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import logger from "./config/logger";
import { HttpError } from "http-errors";
import authRouter from "./routes/auth";

const app = express();

app.use(express.json());

// Root route
app.get("/", (req, res) => {
   res.send("auth-service ");
});

// Auth routes
app.use("/auth", authRouter);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
   logger.error(err); // Log the full error object for detailed information

   const statusCode = err.statusCode || 500;

   res.status(statusCode).json({
      errors: [
         {
            type: err.name,
            msg: err.message,
            location: "", // Could be used for request-related location info, if applicable
            path: req.path, // Provide the path for better context
         },
      ],
   });
});

export default app;
