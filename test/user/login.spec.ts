// import { AppDataSource } from "../../src/config/data-source";
// import { DataSource } from "typeorm";
// import request from 'supertest';
// import app from "../../src/app";

// describe("POST /auth/login", () => {
//    let connection: DataSource;

//    beforeAll(async () => {
//       connection = await AppDataSource.initialize();
//    });

//    beforeEach(async () => {
//       await connection.dropDatabase();
//       await connection.synchronize();
//    });

//    afterAll(async () => {
//       if (connection && connection.isInitialized) {
//          await connection.destroy();
//       }
//    });

//    describe("All fields Exists", () => {
//       it("should return 200 status code", async () => {
//         //arrange
//         const credential = {
//             "email":"jayed.freelance@gmail.com",
//             "password":"thedenoreact015"
//         }

//         //act

//         const response = await request(app).post("/auth/login").send(credential);

//         //assert

//         expect(response.statusCode).toBe(200)

//       });
//    });

//    describe("Some fields are missing", () => {
//       it("should return 400 status code if email is missing", () => {});
//       it("should return 400 status code if password is missing", () => {});
//    });
// });
