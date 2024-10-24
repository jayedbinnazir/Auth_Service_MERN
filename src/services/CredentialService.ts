import bcrypt from "bcrypt";
export class CredentialService {
   async comparePassword(password: string, userPassword: string) {
      return await bcrypt.compare(password, userPassword);
   }
}
