import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToOne,
   UpdateDateColumn,
   CreateDateColumn,
} from "typeorm";
import { Users } from "./User";

@Entity()
export class RefreshToken {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ type: "timestamp" })
   expiresAt: Date;

   @ManyToOne(() => Users)
   user: Users;
   //userId

   @UpdateDateColumn()
   updatedAt: number;

   @CreateDateColumn()
   createdAt: number;
}
