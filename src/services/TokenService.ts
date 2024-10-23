import { Users } from "../entity/User";
import { RefreshToken } from "../entity/RefreshToken";
import createHttpError from "http-errors";
import { JwtPayload, sign } from "jsonwebtoken";
import fs from "node:fs";
import path from "node:path";
import { Config } from "../config/index";
import { Repository } from "typeorm";

export class TokenService {
   // eslint-disable-next-line no-unused-vars
   constructor(private refreshTokenRepository: Repository<RefreshToken>) {}

   generateAccessToken(payLoad: JwtPayload) {
      let privateKey: Buffer;

      try {
         privateKey = fs.readFileSync(
            path.join(__dirname, "../../certs/private.pem"),
         );
      } catch {
         const error = createHttpError(500, "error reading private key");
         throw error;
      }

      const accessToken = sign(payLoad, privateKey, {
         expiresIn: "1h",
         issuer: "auth_service",
         algorithm: "RS256",
      });

      return accessToken;
   }

   generateRefreshToken(payLoad: JwtPayload) {
      const refreshToken = sign(payLoad, Config.REFRESH_TOKEN_SECRET!, {
         expiresIn: "1y",
         issuer: "auth_service",
         algorithm: "HS256",
         jwtid: String(payLoad.id),
      });

      return refreshToken;
   }

   async persistRefreshToken(user: Users) {
      const MS_IN_YEAR = 1000 * 60 * 60 * 24 * 365;

      const newRefreshToken = await this.refreshTokenRepository.save({
         user: user,
         expiresAt: new Date(Date.now() + MS_IN_YEAR),
      });

      return newRefreshToken;
   }
}
