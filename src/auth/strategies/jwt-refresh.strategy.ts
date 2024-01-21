import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UsersService } from "../../users/users.service";
import { UserResponse } from "src/users/response/user.response";
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh-token") {
	constructor(private readonly userService: UsersService, readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request?.cookies?.refreshToken;
				},
			]),
			secretOrKey: configService.get("JWT_REFRESH_TOKEN_SECRET"),
			passReqToCallback: false,
		});
	}

	public async validate(token: any): Promise<UserResponse> {
		const { id } = token;
		const user = await this.userService.findOneById(id);

		return {
			...user,
		};
	}
}
