import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './userDto/create.user.dto';
import { User } from './user.schema';
import { LoginUserDto } from './userDto/login.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<{ message: String, user: User }> {
    return this.userService.register(dto)
  }
  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<String> {
    return this.userService.login(dto)
  }
}
