import { ApiProperty } from "@nestjs/swagger";

export class UserResponse {
	@ApiProperty()
	id: number;

	@ApiProperty()
	login: string;

	@ApiProperty()
	first_name: string;

	@ApiProperty()
	last_name: string;

	@ApiProperty()
	middle_name: string;

	@ApiProperty()
	created_at: Date;

	@ApiProperty()
	updated_at: Date;
}