import { Permissions } from 'src/permission/permissions.enum';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';


export enum UserRole {
    DIRECTOR = 'director',
    TEACHER = 'teacher',
    STUDENT = 'student',
}

@Entity({
    name: 'user',
  })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  fullname: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column('simple-array', {nullable: true}) 
  permissions: Permissions[];
}
