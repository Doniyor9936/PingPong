import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from 'class-transformer';

export class CreateTarifDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    pricePerHour: number;

    @IsArray()
    @IsNotEmpty()
    rackets?: string[];
}
