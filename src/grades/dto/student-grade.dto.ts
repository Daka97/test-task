import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StudentGradesDto {

    @ApiProperty()
    @IsString()
    studentId: number;

}