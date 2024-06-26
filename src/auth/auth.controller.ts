import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@prisma/client';
import AppError from 'src/utils/appError';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(
    @Body() userData: CreateAuthDto,
  ): Promise<{ message: string; user: User; token: string }> {
    try {
      const user = await this.authService.createUser(userData);
      const token = this.generateToken(user.id, user.login);
      return { message: 'Registration successful', user, token };
    } catch (error) {
      throw new AppError('User already exists', 400);
    }
  }

  @Post('signin')
  async login(
    @Body() credentials: { login: string; password: string },
  ): Promise<{ message: string; user: User; token: string }> {
    const user = await this.authService.validateUser(
      credentials.login,
      credentials.password,
    );
    const token = this.generateToken(user.id, user.login);
    return { message: 'Login successful', user, token };
  }

  @Post('update-user')
  async updateUser(
    @Body() userData: UpdateAuthDto,
  ): Promise<{ message: string; user: User; token: string }> {
    try {
      const user = await this.authService.updateUser(userData);
      const token = this.generateToken(user.id, user.login);
      return { message: 'Update successful', user, token };
    } catch (error) {
      throw new AppError('User not found', 404);
    }
  }

  private generateToken(userId: string, login: string): string {
    return this.jwtService.sign({ userId, login });
  }
}
