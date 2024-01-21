import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { StudentGradesDto } from './dto/student-grade.dto';

@Injectable()
export class GradesService {

  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
  ) { }
  create(createGradeDto: CreateGradeDto) {
    const { value, studentId, subjectId } = createGradeDto;
    const grade = this.gradeRepository.create({value,
      student: { id: studentId},
      subject: { id: subjectId }
    });
    return this.gradeRepository.save(grade);
  }

  async findAll(params: PaginationDto) {
    const page = Number(params.page)
    const size = Number(params.size);
    const [grades, total] = await this.gradeRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });

    if (!grades || grades.length === 0) {
      throw new NotFoundException('No users found.');
    }

    return { grades, total };
  }

  async findOne(id: number) {
    const grade = await this.gradeRepository.findOne({ where: { id } })
    if (!grade) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return grade;
  }

  async findAverageGrades(studentGradesDto: StudentGradesDto) {
    const { studentId, groupId } = studentGradesDto;
    if (!studentId || !groupId) {
      throw new BadRequestException('Invalid input parameters');
    }

    const grades = await this.gradeRepository.find({
      where: {
        student: {id: studentId},
      },
      relations: ['student', 'subject', 'student.group', 'student.user'],
    });

    
    const subjectAverages: { fullname: string, groupName: string, subject: string; averageGrade: number }[] = [];
    const subjectGradesMap: Record<string, { grades: number[]; students: { fullname: string, groupName: string }[] }> = {};

    grades.forEach((grade) => {
      const subjectName = grade.subject.name;
      const gradeValue = parseFloat(grade.value);
      const fullname = grade.student.user.fullname;
      const groupName = grade.student.group.name;
      if (!subjectGradesMap[subjectName]) {
        subjectGradesMap[subjectName] = {
          grades: [],
          students: [],
        };
      }
    
      subjectGradesMap[subjectName].grades.push(gradeValue);
      subjectGradesMap[subjectName].students.push({ fullname, groupName });
    });

    for (const subjectName in subjectGradesMap) {
      const { grades, students } = subjectGradesMap[subjectName];
     const averageGrade = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
     subjectAverages.push({
       subject: subjectName,
       averageGrade,
       fullname: students[0].fullname,
       groupName: students[0].groupName
     });
    }

    subjectAverages.sort((a, b) => b.subject.localeCompare(a.subject));
    return subjectAverages
  }

  async getGroupAverages(groupId: number): Promise<any> {
    const grades = await this.gradeRepository.find({
      where: {
        student: { group: { id: groupId } },
      },
      relations: ['student', 'subject', 'student.group'],
    });
    const subjectAverages: { subject: string; averageGrade: number }[] = [];
    const subjectGradesMap: Record<string, number[]> = {};

    grades.forEach((grade) => {
      const subjectName = grade.subject.name;
      const gradeValue = parseFloat(grade.value);

      if (!subjectGradesMap[subjectName]) {
        subjectGradesMap[subjectName] = [];
      }


      subjectGradesMap[subjectName].push(gradeValue);
    });

    for (const subjectName in subjectGradesMap) {
      const gradesForSubject = subjectGradesMap[subjectName];
      const averageGrade =
        gradesForSubject.reduce((sum, grade) => sum + grade, 0) / gradesForSubject.length;

      subjectAverages.push({
        subject: subjectName,
        averageGrade,
      });
    }

    return subjectAverages;
  

  }
  async remove(id: number) {
     await this.gradeRepository.softDelete(id)
  }
}
