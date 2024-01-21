import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';
import { StudentGradesDto } from './dto/student-grade.dto';
import { SetRoutePermissions } from 'src/auth/decorator/set-permission.decorator';
import { Permissions } from 'src/permission/permissions.enum';

@ApiTags('Grades')
@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @Get()
  @SetRoutePermissions([Permissions.READ_GRADES])
  findAll(@Query() params: PaginationDto) {
    return this.gradesService.findAll(params);
  }
  //! "for a specific student (name/group/subject/average grade)" 
  //! as it says for a specific student, as one student can be only in one group like 'Group A'
  //! so I did not implement the sort by group logic
  @Get('average')
  @SetRoutePermissions([Permissions.ACCESS_SYSTEM_REPORTS])
  async findAverageGrades(@Query() studentGradesDto: StudentGradesDto) {
    return this.gradesService.findAverageGrades(studentGradesDto);
  }

  @Get('group-averages/:groupId')
  @SetRoutePermissions([Permissions.ACCESS_SYSTEM_REPORTS])
  getGroupAverages(@Param('groupId') groupId: number): Promise<any> {
    return this.gradesService.getGroupAverages(groupId);
  }

  @Get(':id')
  @SetRoutePermissions([Permissions.READ_GRADES])
  findOne(@Param('id') id: string) {
    return this.gradesService.findOne(+id);
  }

 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradesService.remove(+id);
  }
}
