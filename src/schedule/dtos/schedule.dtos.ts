import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class ScheduleDto {

  @ApiProperty({ example: '32zzbq' })
  @IsString()
  id: string;

  @ApiProperty({ example: '2024-01-16T00:00:00Z' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: '2024-01-16T11:00:00Z' })
  @IsDateString()
  time: string;
  
}
