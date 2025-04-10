import { IsEmail, IsString, IsNotEmpty, IsDate, Matches, IsEnum, IsStrongPassword } from "class-validator";
import { Type } from "class-transformer";

export enum UserRoles {
    ADMIN = 'admin',
    SUPER_ADMIN = 'super_admin',
    USER = 'user',
}
export class CreateUserDto {
    @IsEmail({}, { message: "Notogri email formati" })
    @IsString()
    @IsNotEmpty({ message: "Email majburiy" })
    email: string;

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

    @IsString()
    @IsNotEmpty({ message: "To‘liq ism majburiy" })
    fullName: string;

    @IsDate({ message: "Tug‘ilgan sana noto‘g‘ri" })
    @Type(() => Date)
    @IsNotEmpty({ message: "Tug‘ilgan sana majburiy" })
    birthDate: Date;

    @IsString()
    @IsNotEmpty({ message: "Telefon raqam majburiy" })
    phone: string;

    @IsEnum(UserRoles, { message: "Role faqat quyidagilardan biri bo‘lishi mumkin: admin, user, superAdmin" })
    @IsNotEmpty({ message: "Role majburiy" })
    role: UserRoles;
}
