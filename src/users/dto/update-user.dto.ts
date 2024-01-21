import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';
import { OptionalProperty } from 'src/common/swagger/utils';
import { Permissions } from 'src/permission/permissions.enum';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'])) {
//tried to use partialtype and omittype, but for some reason it did not work
    @ApiProperty()
	@IsString()
	fullname: string;

    @ApiProperty({default:Permissions.ACCESS_SYSTEM_REPORTS})
    @IsOptional()
    @IsString()
    permission: string;
}
