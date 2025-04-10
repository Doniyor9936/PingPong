import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './userDto/create.user.dto';
import { User } from './user.schema';
import { LoginUserDto } from './userDto/login.user.dto';
import { UpdateUserDto } from './userDto/update.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<{ message: String, user: User }> {
    return this.userService.register(dto)
  }
  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<{ message: String }> {
    return this.userService.login(dto)
  }
  @Put('edit/:id')
  async updateUser(@Param('id') _id: string, @Body() dto: UpdateUserDto): Promise<{ message: string, user: User }> {
    return this.userService.updateUser(_id, dto)
  }
  @Delete('delete/:id')
  async deleteUser(@Param('id') _id: string): Promise<{ message: string }> {
    return this.userService.deleteUser(_id)
  }
  @Get('getAllUser')
  async getAllUser(): Promise<User[]> {
    return this.userService.getAllUser()
  }
  @Get('getOneUser/:id')
  async getOneUser(@Param('id') _id: string): Promise<User> {
    return this.userService.getOneUser(_id)
  }

  @Get("verify/:otp")
  async verifyUser(@Param('otp') otp: string): Promise<{ message: string }> {
    return this.userService.verifyUser(otp)
  }
}
