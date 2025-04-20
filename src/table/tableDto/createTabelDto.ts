import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTableDto {
    @IsString()
    name: string

    @IsNumber()
    @IsNotEmpty({ message: "stol raqami majburiy" })
    number: number
}