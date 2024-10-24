import winston from "winston";

const logger = winston.createLogger({
   level: "info",
   defaultMeta: {
      "service-name": "Auth-service",
   },
   format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
   ),

   transports: [
      new winston.transports.File({
         dirname: "logs",
         filename: "combined.logs",
         level: "info",
      }),
      new winston.transports.File({
         dirname: "logs",
         filename: "debug.logs",
         level: "debug",
      }),

      new winston.transports.File({
         dirname: "logs",
         filename: "error.logs",
         level: "error",
      }),
      new winston.transports.Console({
         level: "info",
      }),
   ],
});

export default logger;
