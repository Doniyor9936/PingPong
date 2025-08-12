import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./userDto/create.user.dto";
import { User } from "./user.schema";
import { LoginUserDto } from "./userDto/login.user.dto";
import { UpdateUserDto } from "./userDto/update.user.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User successfully registered.", type: User })
  async register(@Body() dto: CreateUserDto): Promise<{ message: string; user: User }> {
    return this.userService.register(dto);
  }

  @Post("login")
  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 200, description: "User successfully logged in." })
  async login(@Body() dto: LoginUserDto): Promise<{ message: string }> {
    return this.userService.login(dto);
  }

  @Put("edit/:id")
  @ApiOperation({ summary: "Update user by ID" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: 200, description: "User successfully updated.", type: User })
  async updateUser(@Param("id") _id: string, @Body() dto: UpdateUserDto): Promise<{ message: string; user: User }> {
    return this.userService.updateUser(_id, dto);
  }

  @Delete("delete/:id")
  @ApiOperation({ summary: "Delete user by ID" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: 200, description: "User successfully deleted." })
  async deleteUser(@Param("id") _id: string): Promise<{ message: string }> {
    return this.userService.deleteUser(_id);
  }

  @Get("getAllUser")
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "List of users.", type: [User] })
  async getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Get("getOneUser/:id")
  @ApiOperation({ summary: "Get a single user by ID" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: 200, description: "User found.", type: User })
  async getOneUser(@Param("id") _id: string): Promise<User> {
    return this.userService.getOneUser(_id);
  }

  @Get("verify/:otp")
  @ApiOperation({ summary: "Verify user by OTP code" })
  @ApiParam({ name: "otp", description: "One Time Password code" })
  @ApiResponse({ status: 200, description: "User successfully verified." })
  async verifyUser(@Param("otp") otp: string): Promise<{ message: string }> {
    return this.userService.verifyUser(otp);
  }
}
