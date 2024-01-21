import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  controllers: [AuthController], 
  imports: [UsersModule, JwtModule.register({secret: "daulet-test-key", signOptions: {expiresIn: "1h"}}), ConfigModule],
  providers: [AuthService, JwtAuthGuard, RolesGuard],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
