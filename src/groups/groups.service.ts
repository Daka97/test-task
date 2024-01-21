import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class GroupsService {

  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) { }

  create(createGroupDto: CreateGroupDto) {
    const group = this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(group);
  }

  async findAll(params: PaginationDto) {
    const page = Number(params.page)
    const size = Number(params.size);
    const [groups, total] = await this.groupRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });

    if (!groups || groups.length === 0) {
      throw new NotFoundException('No users found.');
    }

    return { groups, total };
  }

  async findOne(id: number) {
    const group = await this.groupRepository.findOne({ where: { id } })
    if (!group) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return group;
  }

  async remove(id: number) {
     await this.groupRepository.softDelete(id)
  }
}
