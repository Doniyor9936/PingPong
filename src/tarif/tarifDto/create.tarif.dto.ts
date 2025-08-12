import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTarifDto {
  @ApiProperty({
    description: 'Tarif nomi',
    example: 'Premium',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Soatlik narx',
    example: 15000,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  pricePerHour: number;

  @ApiProperty({
    description: 'Raketlar ro‘yxati',
    example: ['Raketa1', 'Raketa2'],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true }) // har bir element string bo‘lishini tekshiradi
  rackets?: string[];
}
