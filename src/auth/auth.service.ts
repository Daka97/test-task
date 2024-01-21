// auth.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { UserResponse } from 'src/users/response/user.response';
import { Response } from 'express';
import { UserInRequestType } from 'src/users/type/user-request.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService, 
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(res: Response, loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;

    const user: UserResponse =  await this.userService.findByUserName(username);

    const { id } = user;
    if (!user) {
      throw new HttpException("User is not found", HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await compare(password, user[0].password);

    if (!isPasswordValid) {
      throw new HttpException("Invalid password", HttpStatus.NOT_FOUND);
    }

    const accessToken = this.getAccessJwtToken({ id });
		const refreshToken = this.getJwtRefreshTokenAndSetInCookie(res, { id });
    return { accessToken, refreshToken, user };
  }

	public getAccessJwtToken(tokenPayload: any): string {
		return this.jwtService.sign(tokenPayload, {
			secret: this.configService.get("JWT_ACCESS_TOKEN_SECRET"),
			expiresIn: `${this.configService.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME")}s`,
		});
	}

  public getJwtRefreshTokenAndSetInCookie(res: Response, tokenPayload: any): string {
		const expiresIn = `${this.configService.get("JWT_REFRESH_TOKEN_EXPIRATION_TIME")}s`;
		const refToken = this.jwtService.sign(tokenPayload, {
			secret: this.configService.get("JWT_REFRESH_TOKEN_SECRET"),
			expiresIn: expiresIn,
		});

		res.cookie("refreshToken", refToken, {
			httpOnly: true,
			maxAge: parseInt(expiresIn, 10) * 1000,
		});

		return refToken;
	}

  public async refresh(res: Response, user: UserInRequestType): Promise<any> {
		const accessToken = this.getAccessJwtToken({ id: user.id });

		const refreshToken = this.getJwtRefreshTokenAndSetInCookie(res, { id: user.id });
		return { accessToken, refreshToken };
	}

  public async logout(res: Response): Promise<void> {
    res.clearCookie('refreshToken');
  }

}
