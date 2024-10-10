import { checkSchema } from "express-validator";

const userValidatorSchema = checkSchema({
   email: {
      notEmpty: {
         errorMessage: "email address is required !",
      },
      trim: true,
      isEmail: {
         errorMessage: "is not valid email address",
      },
   },

   firstName: {
      notEmpty: {
         errorMessage: "firstName is required",
      },
   },
   lastName: {
      notEmpty: {
         errorMessage: "firstName is required",
      },
   },
   password: {
      notEmpty: {
         errorMessage: "password is required",
      },
      isLength: {
         options: { min: 8 },
         errorMessage: "Password must be at least 8 characters long",
      },
   },
});

export default userValidatorSchema;
