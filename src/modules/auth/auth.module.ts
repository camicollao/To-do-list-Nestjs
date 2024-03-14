import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule.register({
    global: true,
    secret: 'password',
    signOptions: {expiresIn: '60s'}
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
