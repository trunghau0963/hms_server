import { ApiProperty } from '@nestjs/swagger';

export class Auth {

  id: number;

  @ApiProperty({ example: 'example@gmail.com', description: 'The email of user' })
  email: string;

  @ApiProperty({ example: '123456', description: 'The password of user' })
  password: string;

  @ApiProperty({ example: 'usename', description: 'The userName' })
  userName: string;

  @ApiProperty({ example: 'Patient', description: 'The role of User' })
  role: string;

  refreshToken: string;
}


