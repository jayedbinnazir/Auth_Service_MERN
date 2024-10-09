import type { DataSource } from "typeorm";
import app from "../../src/app";
import request from "supertest";
import { Users } from "../../src/entity/User";
import { AppDataSource } from "../../src/config/data-source";
import { truncateTable } from "../utils";

describe("POST  /auth/register", () => {
   let connection: DataSource;

   beforeAll(async () => {
      connection = await AppDataSource.initialize();
   });

   beforeEach(async () => {
      await truncateTable(connection);
   });

   afterAll(async () => {
      if (connection && connection.isInitialized) {
         await connection.destroy();
      }
   });

   describe("All fields exxists", () => {
      it("should return status 201 ", async () => {
         //arrange
         const userdata = {
            firstName: "Jayed",
            lastName: "Bin Nazir",
            email: "jayed.freelance@gmail.com",
            password: "Jayed015",
         };
         //act
         const response = await request(app)
            .post("/auth/register")
            .send(userdata);

         //assert
         expect(response.statusCode).toBe(201);
      });

      it("should return json response ", async () => {
         //arrange
         const userdata = {
            firstName: "Jayed",
            lastName: "Bin Nazir",
            email: "jayed.freelance@gmail.com",
            password: "Jayed015",
         };
         //act
         const response = await request(app)
            .post("/auth/register")
            .send(userdata);

         //assert

         expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json"),
         );
      });

      it("should persists user ", async () => {
         //arrange
         const userdata = {
            firstName: "Jayed",
            lastName: "Bin Nazir",
            email: "jayed.freelance@gmail.com",
            password: "Jayed015",
         };
         //act
         const response = await request(app)
            .post("/auth/register")
            .send(userdata);

         //assert
         const userRepository = connection.getRepository(Users);
         const users = await userRepository.find();
         expect(users).toHaveLength(1);
         expect(users[0].firstName).toBe(userdata.firstName);
         expect(users[0].lastName).toBe(userdata.lastName);
         expect(users[0].email).toBe(userdata.email);
         expect(users[0].password).toBe(userdata.password);
      });

      it("should return registered newUser id ", async () => {
         //arrange
         const userdata = {
            firstName: "Jayed",
            lastName: "Bin Nazir",
            email: "jayed.freelance@gmail.com",
            password: "Jayed015",
         };
         //act
         const response = await request(app)
            .post("/auth/register")
            .send(userdata);

         //assert
         const usersRepository = connection.getRepository(Users);
         const users = await usersRepository.find();
         expect(response.body).toHaveProperty("id");
         expect(typeof response.body.id).toBe("number");
         expect(users[0]?.id).toBe(response.body.id);
      });
   });
});
