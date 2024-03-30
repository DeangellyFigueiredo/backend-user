import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserModel {
  @Column('uuid', { unique: true, primary: true, nullable: false })
  id: string;
  @Column({ length: 120 })
  name: string;
  @Column({ length: 120 })
  surname: string;
  @Column({ length: 255 })
  email: string;
  @Column({ length: 120 })
  password: string;
  @Column('int')
  accessLevel: number;
  @Column('boolean')
  isActive: boolean;
  @Column('timestamp')
  createdAt: Date;
}
