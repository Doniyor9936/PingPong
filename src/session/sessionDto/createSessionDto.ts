import { 
    IsBoolean, 
    IsEnum, 
    IsNumber, 
    IsOptional, 
    IsString, 
    Matches, 
    Min 
  } from "class-validator";
  import { ApiProperty } from '@nestjs/swagger';
  
  export enum SessionType {
    VIP = 'vip',
    TIMED = 'timed'
  }
  
  export class CreateSessionDto {
    @ApiProperty({
      description: 'ID of the table for the session',
      example: '64d0c6bfa3e8f7c9b1d2a4e5',
    })
    @IsString()
    table: string;
  
    @ApiProperty({
      description: 'Custom price for the session',
      example: 5000,
      minimum: 0,
    })
    @IsNumber()
    @Min(0)
    customPrice: number;
  
    @ApiProperty({
      description: 'Session start time in HH:mm format',
      example: '09:30',
      required: false,
    })
    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'startTime format HH:mm bo‘lishi kerak' })
    startTime?: string;
  
    @ApiProperty({
      description: 'Session end time in HH:mm format',
      example: '11:00',
      required: false,
    })
    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'endTime format HH:mm bo‘lishi kerak' })
    endTime?: string;
  
    @ApiProperty({
      description: 'Type of session',
      enum: SessionType,
      required: false,
    })
    @IsOptional()
    @IsEnum(SessionType)
    type?: SessionType;
  
    @ApiProperty({
      description: 'Is the session paused',
      example: false,
    })
    @IsBoolean()
    paused: boolean;
  
    @ApiProperty({
      description: 'Time when session was paused',
      example: '00:15',
    })
    @IsString()
    pausedTime: string;
  
    @ApiProperty({
      description: 'Payment method used',
      example: 'cash',
    })
    @IsString()
    paymentMethod: string;
  }
  