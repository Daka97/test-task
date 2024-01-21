import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, UsersService],
  imports: [UsersModule]
})
export class StudentsModule {}
