import { 
    IsEmail, 
    IsString, 
    IsNotEmpty, 
    IsDate, 
    IsEnum, 
    IsStrongPassword 
  } from "class-validator";
  import { Type } from "class-transformer";
  import { ApiProperty } from '@nestjs/swagger';
  
  export enum UserRoles {
    ADMIN = 'admin',
    SUPER_ADMIN = 'super_admin',
    USER = 'user',
  }
  
  export class CreateUserDto {
    @ApiProperty({
      description: 'Foydalanuvchining email manzili',
      example: 'user@example.com',
    })
    @IsEmail({}, { message: "Notogri email formati" })
    @IsString()
    @IsNotEmpty({ message: "Email majburiy" })
    email: string;
  
    @ApiProperty({
      description: 'Foydalanuvchi uchun kuchli parol (kamida 6 ta belgi, katta va kichik harf, raqam, maxsus belgi)',
      example: 'Str0ngP@ss!',
    })
    @IsStrongPassword(
      {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
      { message: "Parol kuchli bo‘lishi kerak (kamida 6 ta belgi, katta va kichik harf, raqam, maxsus belgi bo‘lishi shart)." }
    )
    @IsString()
    @IsNotEmpty({ message: "Parol majburiy" })
    password: string;
  
    @ApiProperty({
      description: 'Foydalanuvchining to‘liq ismi',
      example: 'Doniyor Usmonov',
    })
    @IsString()
    @IsNotEmpty({ message: "To‘liq ism majburiy" })
    fullName: string;
  
    @ApiProperty({
      description: 'Foydalanuvchining tug‘ilgan sanasi',
      example: '1990-05-20T00:00:00.000Z',
      type: String,
      format: 'date-time',
    })
    @IsDate({ message: "Tug‘ilgan sana noto‘g‘ri" })
    @Type(() => Date)
    @IsNotEmpty({ message: "Tug‘ilgan sana majburiy" })
    birthDate: Date;
  
    @ApiProperty({
      description: 'Foydalanuvchining telefon raqami',
      example: '+998901234567',
    })
    @IsString()
    @IsNotEmpty({ message: "Telefon raqam majburiy" })
    phone: string;
  
    @ApiProperty({
      description: 'Foydalanuvchi roli',
      example: UserRoles.USER,
      enum: UserRoles,
    })
    @IsEnum(UserRoles, { message: "Role faqat quyidagilardan biri bo‘lishi mumkin: admin, user, super_admin" })
    @IsNotEmpty({ message: "Role majburiy" })
    role: UserRoles;
  }
  