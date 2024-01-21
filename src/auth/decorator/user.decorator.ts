import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserResponse } from "src/users/response/user.response";

export const User = createParamDecorator((data: string, ctx: ExecutionContext): UserResponse => {
	const request = ctx.switchToHttp().getRequest();
	const user = request.user;

	return data ? user?.[data] : user;
});
