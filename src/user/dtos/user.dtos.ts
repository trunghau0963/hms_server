import { ApiProperty } from '@nestjs/swagger';
export class UserType {
  typeUser: string;
}

export class ChangeStatus {
  @ApiProperty({ example: 'Patient', description: 'The role of user' })
  role: string;
}
