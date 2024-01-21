import { ApiProperty } from "@nestjs/swagger";
import { Matches, IsString, IsNotEmpty } from "class-validator";
import { UserRole } from "../entities/user.entity";
import { Transform } from "class-transformer";

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	username: string;

    @ApiProperty()
	@IsString()
	fullname: string;

    @ApiProperty({ default: "test" })
    @Transform(param => param.value.trim())
	@IsString()
	@IsNotEmpty()
	password: string;

    @ApiProperty()
	@IsString()
	role: UserRole;
}
