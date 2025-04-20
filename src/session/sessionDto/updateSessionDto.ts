import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, Matches, Min } from "class-validator";

export enum SessionType {
    VIP = 'vip',
    TIMED = 'timed'
}
export class UpdateSessionDto {
    @IsNumber()
    @Min(0)
    customPrice?: number

    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'startTime format HH:mm bo‘lishi kerak' })
    startTime?: string;

    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'endTime format HH:mm bo‘lishi kerak' })
    endTime?: string;

    @IsEnum(SessionType)
    type?: SessionType

    @IsBoolean()
    paused?: boolean

    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'pausedTime format HH:mm bo‘lishi kerak' })
    pausedTime?: string;

} 