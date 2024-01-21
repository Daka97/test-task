import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Permissions } from 'src/permission/permissions.enum';
import { SetRoutePermissions } from 'src/auth/decorator/set-permission.decorator';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags("Subjects")
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) { }

  @Post()
  @SetRoutePermissions([Permissions.CREATE_SUBJECT])
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  @SetRoutePermissions([Permissions.READ_SUBJECT])
  findAll(@Query() params: PaginationDto) {
    return this.subjectsService.findAll(params);
  }

  @Get(':id')
  @SetRoutePermissions([Permissions.READ_SUBJECT])
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }

  @Delete(':id')
  @SetRoutePermissions([Permissions.DELETE_SUBJECT])
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(+id);
  }
}
