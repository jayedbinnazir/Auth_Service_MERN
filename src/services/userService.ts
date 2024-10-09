import { UserData } from "types";
import { Users } from "../entity/User";
import { Repository } from "typeorm";

export class UserService {
   // eslint-disable-next-line no-unused-vars
   constructor(private userRepository: Repository<Users>) {}
   async create({ firstName, lastName, email, password }: UserData) {
      await this.userRepository.save({
         firstName,
         lastName,
         email,
         password,
      });
   }
}
