import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { SetRoutePermissions } from 'src/auth/decorator/set-permission.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Permissions } from 'src/permission/permissions.enum';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';

@ApiTags('Groups')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { }

  @Post()
  @SetRoutePermissions([Permissions.CREATE_GROUPS])
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @SetRoutePermissions([Permissions.READ_GROUPS])
  findAll(@Query() params: PaginationDto) {
    return this.groupsService.findAll(params);
  }

  @Get(':id')
  @SetRoutePermissions([Permissions.READ_GROUPS])
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Delete(':id')
  @SetRoutePermissions([Permissions.DELETE_GROUPS])
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
