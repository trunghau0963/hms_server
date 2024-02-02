import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class Patient {
  @ApiProperty({ example: '1e41m4', description: 'The id of user' })
  id: number;

  @ApiProperty({
    example: 'Patient1@gmail.com',
    description: 'The email of user',
  })
  @IsEmail({}, { message: 'Invalid email message' })
  email: string;

  @ApiProperty({
    example: '0123456789',
    description: 'The Phone Numver of user',
  })
  phoneNumber: string;

  @ApiProperty({ example: 'Patient1', description: 'The password of user' })
  password: string;

  @ApiProperty({ example: 'Patient1', description: 'The userName' })
  userName: string;

  @ApiProperty({ example: null, description: 'The dob of user' })
  dob?: string;

  @ApiProperty({ example: null, description: 'The address of user' })
  userAddress?: string;

  @ApiProperty({ example: false })
  islock?: boolean;

  @ApiProperty({ example: null })
  refreshToken?: string;
}

export class AppointmentEntity {
  @ApiProperty({ example: '1e41m4' })
  @IsNotEmpty({ message: 'idPatient is required' })
  idPatient: string;

  @ApiProperty({ example: '32zzbq' })
  @IsNotEmpty({ message: 'idDentist is required' })
  idDentist: string;

  @ApiProperty({ example: '2024-01-16T00:00:00.000Z' })
  @IsDate()
  @IsNotEmpty({ message: 'dateOfAppointment is required' })
  dateOfAppointment: Date;

  @ApiProperty({ example: '2024-01-16T11:00:00.000Z' })
  @IsNotEmpty({ message: 'timeOfAppointment is required' })
  timeOfAppointment: string;

  @ApiProperty({ example: Patient })
  @IsNotEmpty({ message: 'status is required' })
  patient: Patient;
}
