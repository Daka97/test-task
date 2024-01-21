import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './response/user.response';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { StudentsService } from 'src/students/students.service';
import { RolePermissions } from 'src/permission/role-permission.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly studentService: StudentsService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    const user = this.userRepository.create(createUserDto);
    if (RolePermissions[createUserDto.role]) {
      user.permissions = RolePermissions[createUserDto.role];
    }
    const data = await this.userRepository.save(user);
  
    if(user.role === "student"){
      const param = {userId: user.id}
      await this.studentService.create(param)
    }
  }

  async findAll(params: PaginationDto): Promise<{ users: User[], total: number }> {
    const page = Number(params.page)
    const size = Number(params.size);
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });

    if (!users || users.length === 0) {
      throw new NotFoundException('No users found.');
    }

    return { users, total };
  }

  async findOneById(id: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByUserName(username: string): Promise<any> {
    const user = await this.userRepository.find({ where: { username } })
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    await this.userRepository.softDelete(id)
  }
}
