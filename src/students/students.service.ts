import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { GroupsService } from 'src/groups/groups.service';


@Injectable()
export class StudentsService {
  constructor(
  @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly groupService: GroupsService) {}

  create(createStudentDto: CreateStudentDto) {
    const {userId, groupId} = createStudentDto;
    const student = this.studentRepository.create({
      user: {id: userId},
      group: {id: groupId}
    });
    return this.studentRepository.save(student);
  }

  async findAll(params: PaginationDto) {
    const page = Number(params.page)
    const size = Number(params.size);
    const [students, total] = await this.studentRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
      relations:['user', 'group']
    });

    if (!students || students.length === 0) {
      throw new NotFoundException('No users found.');
    }

    return { students, total };
  }

 async findOne(id: number) {
    const student = await this.studentRepository.findOne({ where: { id }, relations:['user', 'group']})
    if (!student) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return student;
  }

  async remove(id: number) {
     await this.studentRepository.softDelete(id)
  }
  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id);

  if (!student) {
    throw new NotFoundException(`Student with ID ${id} not found`);
  }

  const newGroupId: number = updateStudentDto.groupId;
  const newGroup = await this.groupService.findOne(newGroupId);

  if (!newGroup) {
    throw new NotFoundException(`Group with ID ${newGroupId} not found`);
  }
  student.group = newGroup;


  return this.studentRepository.save(student);
  }
}
