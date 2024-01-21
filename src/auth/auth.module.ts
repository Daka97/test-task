import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.strategy';


@Module({
  controllers: [AuthController], 
  imports: [UsersModule, 
    JwtModule.register({secret: "daulet-test-key", signOptions: {expiresIn: "1h"}}),
    PassportModule.register({ defaultStrategy: 'jwt' }),ConfigModule],
  providers: [AuthService, JwtAuthGuard, RolesGuard, JwtStrategy, JwtRefreshTokenStrategy],
  exports: [JwtModule]
})
export class AuthModule {}

