import { IsEmail, IsNotEmpty, Matches, MinLength, IsDate } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { ScheduleDto } from "src/schedule/dtos/schedule.dtos";


export class AppointmentDto {

    @ApiProperty({ example: '1e41m4' })
    @IsNotEmpty({ message: "idPatient is required" })
    idPatient: string;


    @ApiProperty({ example: '32zzbq' })
    @IsNotEmpty({ message: "idDentist is required" })
    idDentist: string;

    @ApiProperty({ example: '2024-01-16T00:00:00.000Z' })
    @IsNotEmpty({ message: "dateOfAppointment is required" })
    date: string;

    @ApiProperty({ example: "2024-01-16T11:00:00.000Z" })
    @IsNotEmpty({ message: "timeOfAppointment is required" })
    time: string;
}

export class AddAppointmentDto {
    @ApiProperty({ example: ScheduleDto })
    schedule: ScheduleDto;

    @ApiProperty({ example: AppointmentDto })
    appointment: AppointmentDto;
}

export class DeleteAppointmentDto {

    @ApiProperty({ example: ScheduleDto })
    schedule: ScheduleDto;

    @ApiProperty({ example: AppointmentDto })
    appointment: AppointmentDto;
}