import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SetRoutePermissions } from 'src/auth/decorator/set-permission.decorator';
import { Permissions } from 'src/permission/permissions.enum';

@ApiTags('Students')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }
  //*From my understanding student is created when the user with the role student is created,
  // *so no need to post request
  // @Post()
  // create(@Body() createStudentDto: CreateStudentDto) {
  //   return this.studentsService.create(createStudentDto);
  // }

  @Get()
  @SetRoutePermissions([Permissions.READ_STUDENT])
  findAll(@Query() params: PaginationDto) {
    return this.studentsService.findAll(params);
  }

  @Get(':id')
  @SetRoutePermissions([Permissions.READ_STUDENT])
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  @SetRoutePermissions([Permissions.UPDATE_STUDENT])
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @SetRoutePermissions([Permissions.DELETE_STUDENT])
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
