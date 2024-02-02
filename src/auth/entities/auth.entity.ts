import { ApiProperty } from "@nestjs/swagger";

export class Auth {
  @ApiProperty({ example: 1, description: "The id of user" })
  id: number;
  @ApiProperty({
    example: "example@gmail.com",
    description: "The email of user",
  })
  email: string;
  @ApiProperty({ example: "123456", description: "The number phone of user" })
  phoneNumber: string;
  @ApiProperty({ example: "123456", description: "The password of user" })
  password: string;

  @ApiProperty({ example: "123456", description: "The dob of user" })
  dob?: string;

  @ApiProperty({ example: "123456", description: "The address of user" })
  userAddress?: string;

  @ApiProperty({ example: "usename", description: "The userName" })
  userName: string;
  @ApiProperty({ example: "Patient", description: "The role of User" })
  role: string;

  @ApiProperty({ example: null, description: "The refreshToken of user" })
  refreshToken?: string;

  @ApiProperty({ example: null, description: "The accessToken of user" })
  accessToken?: string;
}
