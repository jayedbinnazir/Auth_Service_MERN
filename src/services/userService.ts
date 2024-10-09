import { UserData } from "types";
import { Users } from "../entity/User";
import { Repository } from "typeorm";
import createHttpError from "http-errors";
import { ROLE } from "../consts";
import bcrypt from "bcrypt";

export class UserService {
   // eslint-disable-next-line no-unused-vars
   constructor(private userRepository: Repository<Users>) {}
   async create({ firstName, lastName, email, password }: UserData) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userRepository.findOne({
         where: {
            email: email,
         },
      });

      if (user) {
         const err = createHttpError(400, "User allready exists");
         throw err;
      }

      try {
         const newUser = await this.userRepository.save({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: ROLE.CUSTOMER,
         });

         return newUser;
      } catch (err) {
         const error = createHttpError(
            500,
            `Failed to save the user in the database ${err}`,
         );
         throw error;
      }
   }
}
