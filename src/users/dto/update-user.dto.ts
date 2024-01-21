import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'])) {
//tried to use partialtype and omittype, but for some reason it did not work
    @ApiProperty()
	@IsString()
	username: string;

    @ApiProperty()
	@IsString()
	fullname: string;

    @ApiProperty()
	@IsString()
	role: UserRole;
}
