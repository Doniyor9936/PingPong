import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateClubDto {

    @IsString()
    @MinLength(3)
    name?: string;

    @IsMongoId()
    owner?: string;

    @IsNotEmpty()
    location?: {
        lat: number,
        long: number,
        landmark: string
    };
}