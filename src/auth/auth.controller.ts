import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus,HttpCode, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { User } from './decorator/user.decorator';
import { UserInRequestType } from 'src/users/type/user-request.type';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserResponse } from 'src/users/response/user.response';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @ApiOkResponse(swaggerType(LoginResponse))
	@HttpCode(HttpStatus.OK)
	@Post("login")
	public async login(@Res({ passthrough: true }) res: Response, @Body() loginDto: LoginDto): Promise<any> {
		return await this.authService.login(res, loginDto);
	}

	@UseGuards(JwtRefreshGuard)
	@Post("refresh")
	public async refresh(@Res({ passthrough: true }) res: Response, @User() user: UserInRequestType): Promise<any> {
		return await this.authService.refresh(res, user);
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Post("logout")
	@HttpCode(HttpStatus.NO_CONTENT)
	public logOut(@Res({ passthrough: true }) res: Response): Promise<void> {
		return this.authService.logout(res);
	}
}
