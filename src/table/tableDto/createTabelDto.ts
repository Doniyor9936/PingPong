import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateTableDto {
  @ApiProperty({
    description: 'Name of the table',
    example: 'VIP Table',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Unique table number',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'stol raqami majburiy' })
  number: number;

  @ApiProperty({
    description: 'ID of the club this table belongs to',
    example: '64d0c6bfa3e8f7c9b1d2a4e5',
  })
  @IsString()  // ObjectId ni string sifatida olish odatiy
  @IsNotEmpty({ message: 'club id majburiy' })
  club: string;
}
