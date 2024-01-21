import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectsModule } from './subjects/subjects.module';
import { AuthModule } from './auth/auth.module';
import { GradesModule } from './grades/grades.module';
import { GroupsModule } from './groups/groups.module';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from './config/database.config';

@Module({
  imports: [SubjectsModule, UsersModule, StudentsModule, GroupsModule, GradesModule, AuthModule,
     TypeOrmModule.forRoot({ autoLoadEntities: true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
