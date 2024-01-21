import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { OptionalProperty } from "src/common/swagger/utils";

export class CreateStudentDto {

    @ApiProperty()
    @IsNumber()
    userId: number;

    @OptionalProperty()
    @IsNumber()
    groupId?: number;

}
