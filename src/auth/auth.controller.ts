import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus,HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

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

	// @ApiOkResponse(swaggerType(TokensResponse))
	// @UseGuards(JwtRefreshGuard)
	// @Post("refresh")
	// public async refresh(@Res({ passthrough: true }) res: Response, @User() user: UserInRequestType): Promise<TokensResponse> {
	// 	return await this.authService.refresh(res, user);
	// }

	// @ApiCreatedResponse()
	// @UseGuards(JwtAuthGuard)
	// @ApiBearerAuth()
	// @Post("logout")
	// @HttpCode(HttpStatus.NO_CONTENT)
	// public logOut(@User() user: UserResponse): Promise<void> {
	// 	return this.authService.removeRefreshToken(user.id);
	// }
}
