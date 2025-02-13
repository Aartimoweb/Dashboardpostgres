import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contact: string;

  @Column()
  gender: string;

  @Column() 
  profile: string;

  @Column({ default: 'user' }) 
  role: string;
}
