import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(
    @Body() userData: { name: string; login: string; password: string },
  ) {
    const user = await this.authService.createUser(userData);
    const token = this.jwtService.sign({ userId: user.id, login: user.login });
    return { message: 'Registration successful', user, token };
  }

  @Post('signin')
  async login(@Body() credentials: { login: string; password: string }) {
    const user = await this.authService.validateUser(credentials);
    const token = this.jwtService.sign({ userId: user.id, login: user.login });
    if (user) {
      return { message: 'Login successfull', user, token };
    }
    return { message: 'Invalid credentials' };
  }

  @Post('update-user')
  async updateUser(@Body() userData: UpdateAuthDto) {
    const user = await this.authService.updateUser(userData);
    const token = this.jwtService.sign({ userId: user.id, login: user.login });
    return { message: 'Update successfull', user, token };
  }
}
