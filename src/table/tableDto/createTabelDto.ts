import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createTableDto {
    @IsString()
    name: string

    @IsNumber()
    @IsNotEmpty({ message: "stol raqami majburiy" })
    number: number
}