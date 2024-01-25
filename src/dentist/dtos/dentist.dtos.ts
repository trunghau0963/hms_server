import { IsString, IsDateString } from 'class-validator';

export class addScheduleDto {

  @IsDateString()
  date: string;

  @IsDateString()
  time: string;
}

export class deleteScheduleDto {

  @IsDateString()
  date: string;

  @IsDateString()
  time: string;
}