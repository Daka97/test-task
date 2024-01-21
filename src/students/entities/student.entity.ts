import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

import { Group } from 'src/groups/entities/group.entity';
import { Grade } from 'src/grades/entities/grade.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rollNumber: string;

  @ManyToOne(() => Group, (group) => group.students)
  group: Group;

  @ManyToOne(() => Grade, (grade) => grade.subject)
  grades: Grade[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
