import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateGradeDto {
    @ApiProperty()
    @IsString()
    value: string;

    @ApiProperty()
    @IsNumber()
    studentId: number;

    @ApiProperty()
    @IsNumber()
    subjectId: number;
}
