import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   firstName: string;

   @Column()
   lastName: string;

   @Column({ unique: true })
   email: string;

   @Column()
   password: string;

   @Column()
   role: string;
}
