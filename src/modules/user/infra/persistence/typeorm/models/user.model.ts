import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserModel{
  @PrimaryGeneratedColumn()
  id : string;
  @Column({length: 120})
  name : string;
  @Column({length: 120})
  surname : string;
  @Column({length: 255})
  email : string;
  @Column({length: 120})
  password : string;
  @Column('int')
  accessLevel : number;

}