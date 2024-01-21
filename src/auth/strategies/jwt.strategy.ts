import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../../users/users.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly userService: UsersService,
		readonly configService: ConfigService,

	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get("JWT_ACCESS_TOKEN_SECRET"),
		});
        console.log(ExtractJwt.fromAuthHeaderAsBearerToken())
	}

	public async validate(payload: any): Promise<any> {
		const { id } = payload;
		const user =  (await this.userService.findOneById(id));

        console.log("SDSD")
        console.log(user)
		// const permissions = 
		return {
			...user,
			// permissions,
		};
	}
}
