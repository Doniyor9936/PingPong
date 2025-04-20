import { IsBoolean, IsDate, IsEnum, IsNumber, IsObject, IsOptional, IsString, Matches, Min } from "class-validator";
import { ObjectId } from "mongoose";

export enum SessionType {
    VIP = 'vip',
    TIMED = 'timed'
}
export class CreateSessionDto {
    @IsString()
    table: ObjectId

    @IsNumber()
    @Min(0)
    customPrice: number

    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'startTime format HH:mm bo‘lishi kerak' })
    startTime?: string;

    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'endTime format HH:mm bo‘lishi kerak' })
    endTime?: string;

    @IsEnum(SessionType)
    type?: SessionType

    @IsBoolean()
    paused: boolean

    @IsString()
    pausedTime: string;

    @IsString()
    paymentMethod: string

}