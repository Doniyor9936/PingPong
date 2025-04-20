import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTarifDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsNumber()
    pricePerHour?: number

    @IsOptional()
    @IsArray()
    rackets?: string[]
}