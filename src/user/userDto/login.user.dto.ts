import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginUserDto {
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
}