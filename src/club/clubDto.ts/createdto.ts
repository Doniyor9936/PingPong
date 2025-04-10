import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateClubDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @IsMongoId()
    owner: string;

    @IsNotEmpty()
    location: {
        lat: number,
        long: number,
        landmark: string
    };
}