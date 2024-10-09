import { UserData } from "types";
import { Users } from "../entity/User";
import { Repository } from "typeorm";
import createHttpError from "http-errors";

export class UserService {
   // eslint-disable-next-line no-unused-vars
   constructor(private userRepository: Repository<Users>) {}
   async create({ firstName, lastName, email, password }: UserData) {
      try {
         const newUser = await this.userRepository.save({
            firstName,
            lastName,
            email,
            password,
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
