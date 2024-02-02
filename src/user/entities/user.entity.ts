import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  IsDate,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/auth/enum";

export class User {
  @ApiProperty({ example: "User_id", description: "The id of user" })
  id: number;

  @ApiProperty({
    example: "User1@gmail.com",
    description: "The email of user",
  })
  @IsEmail({}, { message: "Invalid email message" })
  email: string;

  @ApiProperty({
    example: "0123456789",
    description: "The Phone Number of user",
  })
  phoneNumber: string;

  @ApiProperty({ example: "User1", description: "The password of user" })
  password: string;

  @ApiProperty({ example: "User1", description: "The userName" })
  userName: string;
}

export class UserEntity extends User {
  @ApiProperty({ example: Role.Admin, description: "The role of user" })
  role: Role;
}

export class NormalUserEntity extends User {
  @ApiProperty({ example: null, description: "The dob of user" })
  dob?: string;

  @ApiProperty({ example: null, description: "The address of user" })
  userAddress?: string;

  @ApiProperty({ example: false })
  islock?: boolean;

  @ApiProperty({ example: null })
  refreshToken?: string;
}

export class AdminUseEntity extends User {
  @ApiProperty({ example: null, description: "The dob of user" })
  dob?: string;

  @ApiProperty({ example: null, description: "The address of user" })
  userAddress?: string;

  @ApiProperty({ example: null })
  refreshToken?: string;
}
