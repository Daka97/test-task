import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './config.type';
import { User } from 'src/users/entities/user.entity';
import { Student } from 'src/students/entities/student.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Grade } from 'src/grades/entities/grade.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const dataSourceConfig = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "dauleturumbaev",
    password: "Daka9711!",
    database: "postgres",
    entities: [User, Student, Subject, Group, Grade],
    migrations: ['src/migrations/*{.ts}'],
    synchronize: true, 
    migrationsRun: true, 
});