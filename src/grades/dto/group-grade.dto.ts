import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GroupGradesDto {

    @ApiProperty()
    @IsString()
    readonly groupId: string;
}