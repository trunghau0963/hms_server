import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';


export class Patient {

    id: number;

    @ApiProperty({ example: 'example@gmail.com', description: 'The email of user' })
    @IsEmail({}, { message: 'Invalid email message' })
    email: string;

    @ApiProperty({ example: '0123456789', description: 'The Phone Numver of user' })
    phoneNumber: string;

    @ApiProperty({ example: '123456', description: 'The password of user' })
    password: string;

    @ApiProperty({ example: 'usename', description: 'The userName' })
    userName: string;

    @ApiProperty({ example: 'Patient', description: 'The role of User' })
    role: string;

    refreshToken: string;
}


