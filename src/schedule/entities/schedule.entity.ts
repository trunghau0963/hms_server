import { IsEmail, IsNotEmpty, Matches, MinLength, IsDate } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class ScheduleEntity {

    @ApiProperty({ example: "32zzbq" })
    @IsNotEmpty({ message: "idPatient is required" })
    idPatient: string;

    @ApiProperty({ example: "2024-02-17T00:00:00.000Z" })
    @IsDate()
    @IsNotEmpty({ message: "dateOfAppointment is required" })
    dateOfAppointment: Date;

    @ApiProperty({ example: "2024-02-17T11:00:00.000Z" })
    @IsNotEmpty({ message: "timeOfAppointment is required" })
    timeOfAppointment: string;
}