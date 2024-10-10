import type { DataSource } from "typeorm";
import app from "../../src/app";
import request from "supertest";
import { Users } from "../../src/entity/User";
import { AppDataSource } from "../../src/config/data-source";
import { truncateTable } from "../utils";
import bcrypt from "bcrypt";
import { ROLE } from "../../src/consts";

describe("POST  /auth/register", () => {
   let connection: DataSource;

   beforeAll(async () => {
      connection = await AppDataSource.initialize();
   });

   beforeEach(async () => {
      // await truncateTable(connection);
      await connection.dropDatabase();
      await connection.synchronize();
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

      it("should save the role as customer", async () => {
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
         expect(users[0]).toHaveProperty("role");
         expect(users[0].role).toBe("customer");
      });

      it("should save hashed password", async () => {
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
         expect(users[0].password).not.toBe(userdata.password);
         const isPasswordHashed = await bcrypt.compare(
            userdata.password,
            users[0].password,
         );
         expect(isPasswordHashed).toBe(true);
      });

      it("should return 400 status code if user exists", async () => {
         //arrange
         const userdata = {
            firstName: "Jayed",
            lastName: "Bin Nazir",
            email: "jayed.freelance@gmail.com",
            password: "Jayed015",
            role: ROLE.CUSTOMER,
         };

         const userRepository = connection.getRepository(Users);
         await userRepository.save(userdata);
         //act
         const response = await request(app)
            .post("/auth/register")
            .send(userdata);

         //assert
         expect(response.statusCode).toBe(400);
      });
   });

   describe("If some Fields are missing", () => {
      it("should return 400 status code if email is missing", async () => {
         //arrange
         const userdata = {
            firstName: "Jayed",
            lastName: "Bin Nazir",
            email: "",
            password: "Jayed015",
            role: ROLE.CUSTOMER,
         };

         //act
         const response = await request(app)
            .post("/auth/register")
            .send(userdata);
         //assert
         expect(response.statusCode).toBe(400);
         const userRepository = connection.getRepository(Users);
         const users = await userRepository.find();
         expect(users).toHaveLength(0);
      });
      it("should return 400 status code if firstName is missing", async () => {
         //arrange
         const userdata = {
            firstName: "",
            lastName: "Bin Nazir",
            email: "jayed.freelance@gmail.com",
            password: "Jayed015",
            role: ROLE.CUSTOMER,
         };

         //act
         const response = await request(app)
            .post("/auth/register")
            .send(userdata);
         //assert
         expect(response.statusCode).toBe(400);
         const userRepository = connection.getRepository(Users);
         const users = await userRepository.find();
         expect(users).toHaveLength(0);
      });
      it("should return 400 status code if lastName is missing", async () => {
         //arrange
         const userdata = {
            firstName: "Jayed",
            lastName: "",
            email: "jayed.freelance@gmail.com",
            password: "Jayed015",
            role: ROLE.CUSTOMER,
         };

         //act
         const response = await request(app)
            .post("/auth/register")
            .send(userdata);
         //assert
         expect(response.statusCode).toBe(400);
         const userRepository = connection.getRepository(Users);
         const users = await userRepository.find();
         expect(users).toHaveLength(0);
      });
      it("should return 400 status code if password is missing", async () => {
         //arrange
         const userdata = {
            firstName: "Jayed",
            lastName: "Bin Nazir",
            email: "jayed.freelance@gmail.com",
            password: "",
            role: ROLE.CUSTOMER,
         };

         //act
         const response = await request(app)
            .post("/auth/register")
            .send(userdata);
         //assert
         expect(response.statusCode).toBe(400);
         const userRepository = connection.getRepository(Users);
         const users = await userRepository.find();
         expect(users).toHaveLength(0);
      });
   });

   //sanitize
   describe("Fields are not in Proper Format", () => {
      it("should trim the email field", async () => {
         //arrange
         const userdata = {
            firstName: "Jayed",
            lastName: "Bin Nazir",
            email: " jayed.freelance@gmail.com",
            password: "Jayed015",
            role: ROLE.CUSTOMER,
         };

         //act
         const response = await request(app)
            .post("/auth/register")
            .send(userdata);

         const userRepository = connection.getRepository(Users);

         const users = await userRepository.find();

         //assert
         expect(users[0].email).toBe(userdata.email.trim());
      });

      it("should return 400 statuscode if not valid email address", async () => {
         //arrange
         const userdata = {
            firstName: "Jayed",
            lastName: "Bin Nazir",
            email: "jayed.freelancegmail.com",
            password: "Jayed015",
            role: ROLE.CUSTOMER,
         };

         //act
         const response = await request(app)
            .post("/auth/register")
            .send(userdata);

         //assert
         expect(response.statusCode).toBe(400);
         const userRepository = connection.getRepository(Users);
         const users = await userRepository.find();
         expect(users).toHaveLength(0);
      });
      it("should return 400 statuscode if password length is less than 8 characters", async () => {
         //arrange
         const userdata = {
            firstName: "Jayed",
            lastName: "Bin Nazir",
            email: "jayed.freelance@gmail.com",
            password: "Jayed01",
            role: ROLE.CUSTOMER,
         };

         //act
         const response = await request(app)
            .post("/auth/register")
            .send(userdata);

         //assert
         expect(response.statusCode).toBe(400);
         const userRepository = connection.getRepository(Users);
         const users = await userRepository.find();
         expect(users).toHaveLength(0);
      });
   });
});
