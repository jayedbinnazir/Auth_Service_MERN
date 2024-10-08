import app from "../../src/app";
import request from "supertest";

describe("POST  /auth/register", () => {
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
   });
});
