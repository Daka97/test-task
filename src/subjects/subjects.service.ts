import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) { }
  create(createSubjectDto: CreateSubjectDto) {
    const subject = this.subjectRepository.create(createSubjectDto);
    return this.subjectRepository.save(subject);
  }

  async findAll(params: PaginationDto) {
    const page = Number(params.page)
    const size = Number(params.size);
    const [subjects, total] = await this.subjectRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });

    if (!subjects || subjects.length === 0) {
      throw new NotFoundException('No users found.');
    }

    return { subjects, total };
  }

  async findOne(id: number) {
    const subject = await this.subjectRepository.findOne({ where: { id } })
    if (!subject) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return subject;
  }

  async remove(id: number) {
    await this.subjectRepository.softDelete(id)
  }
}
