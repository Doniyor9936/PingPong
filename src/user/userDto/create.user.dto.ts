import { IsEmail, IsString, IsNotEmpty, MinLength, IsDate, IsOptional, IsNumber, IsMongoId, Matches, IsEnum, isStrongPassword, IsStrongPassword } from "class-validator";
import { Type } from "class-transformer";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    MANAGER = "manager",
}

export class CreateUserDto {
    @IsEmail({}, { message: "Noto‘g‘ri email formati" })
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

    @IsOptional()
    @IsNumber({}, { message: "Ish haqi raqam bo‘lishi kerak" })
    salary?: number;

    @IsString()
    @IsNotEmpty({ message: "Telefon raqam majburiy" })
    @Matches(/^\+998[0-9]{9}$/, { message: "Telefon raqami O‘zbekiston formati bo‘yicha kiritilishi kerak: +998XXXXXXXXX" })
    phone: string;

    @IsOptional()
    @IsMongoId({ message: "Noto‘g‘ri klub ID" })
    club?: string;

    @IsEnum(UserRole, { message: "Role faqat quyidagilardan biri bo‘lishi mumkin: admin, user, manager" })
    @IsNotEmpty({ message: "Role majburiy" })
    role: UserRole;
}
