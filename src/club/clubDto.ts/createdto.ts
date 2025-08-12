import { IsMongoId, IsNotEmpty, IsString, MinLength, IsObject, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
    @ApiProperty({ description: 'Latitude', example: 40.4168 })
    @IsNumber()
    lat: number;
  
    @ApiProperty({ description: 'Longitude', example: -3.7038 })
    @IsNumber()
    long: number;
  
    @ApiProperty({ description: 'Famous landmark nearby', example: 'Santiago Bernabéu Stadium' })
    @IsString()
    landmark: string;
  }
  
  export class CreateClubDto {
    @ApiProperty({ description: 'Name of the club', example: 'Real Madrid CF', minLength: 3 })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;
  
    @ApiProperty({ description: 'Owner ID (Mongo ObjectId format)', example: '64afc3b2e8f1b8b8c1a2d3f4' })
    @IsNotEmpty()
    @IsMongoId()
    owner: string;
  
    @ApiProperty({ description: 'Location details of the club', type: LocationDto })
    @IsNotEmpty()
    @IsObject()
    location: LocationDto;
  }
  