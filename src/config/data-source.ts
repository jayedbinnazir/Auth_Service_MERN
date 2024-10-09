import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "../entity/User";
import { Config } from "./index";

export const AppDataSource = new DataSource({
   type: "postgres",
   host: Config.DB_HOST,
   port: Number(Config.DB_PORT),
   username: Config.DB_USERNAME,
   password: Config.DB_PASSWORD,
   database: Config.DB_NAME,
   synchronize: false,
   logging: false,
   entities: [Users],
   migrations: [],
   subscribers: [],
});
