import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { OptionalProperty } from 'src/common/swagger/utils';
import { IsNumber } from 'class-validator';

export class UpdateStudentDto extends PartialType(OmitType(CreateStudentDto, ["userId"])) {

    //tried to use partialtype and omittype, but for some reason it did not work
    @OptionalProperty()
    @IsNumber()
    groupId?: number;
}
