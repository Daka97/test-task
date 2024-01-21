import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { SetRoutePermissions } from 'src/auth/decorator/set-permission.decorator';
import { Permissions } from 'src/permission/permissions.enum';

@ApiTags('Users')
// @UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @SetRoutePermissions([Permissions.READ_USERS])
  findAll(@Query() params: PaginationDto) {
    return this.usersService.findAll(params);
  }

  @Get(':username')
  findByUserName(@Param('username') username: string) {
    return this.usersService.findByUserName(username);
  }

  @Get(':id')
  @SetRoutePermissions([Permissions.READ_USERS])
  findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  @SetRoutePermissions([Permissions.UPDATE_USERS])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @SetRoutePermissions([Permissions.DELETE_USERS])
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


}
