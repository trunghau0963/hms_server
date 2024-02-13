import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  IsDate,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "Ntthau0963@gmail.com" })
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Email is invalid" })
  email: string;

  @ApiProperty({ example: "0779639805" })
  @IsNotEmpty({ message: "Phone number is required" })
  @MinLength(10, { message: "Phone number too short" })
  @Matches(/^[0-9]{10}$/, {
    message: "Phone number invalid",
  })
  phoneNumber: string;

  @ApiProperty({ example: "Ntthau063" })
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(8, { message: "Password too short" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      "Password too weak, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
  })
  password: string;

  @ApiProperty({ example: "Ntthau063" })
  @IsNotEmpty({ message: "Username is required" })
  @MinLength(2, { message: "Username too short" })
  userName: string;

  @ApiProperty({ example: "Admin" })
  @IsNotEmpty({ message: "Role is required" })
  role: string;
}

export class LoginDtoByEmail {
  @IsNotEmpty({ message: "Username is required" })
  @IsEmail({}, { message: "Email is invalid" })
  userName: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(8, { message: "Password too short" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      "Password too weak, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
  })
  password: string;

  @IsNotEmpty({ message: "Role is required" })
  role: string;
}

export class LoginDtoByPhone {
  @ApiProperty({ example: "0133456789" })
  @IsNotEmpty({ message: "Phone number is required" })
  @MinLength(10, { message: "Phone number too short" })
  @Matches(/^[0-9]{10}$/, {
    message: "Phone number invalid",
  })
  phoneNumber: string;

  @ApiProperty({ example: "Admin123" })
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(8, { message: "Password too short" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: "Password too weak",
  })
  password: string;

  @ApiProperty({ example: "Admin" })
  @IsNotEmpty({ message: "Role is required" })
  role: string;
}

export class AccessTokenDto {
  @ApiProperty()
  @IsNotEmpty({ message: "Access token is required" })
  accessToken: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODRrYXAiLCJ1c2VybmFtZSI6IkFkbWluMTIzIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzA2ODU4NzM0LCJleHAiOjE3MDc0NjM1MzR9.6xYeSsGt54YI_K5ROQfWkWeBZPOHm66tgvG_Y4Hf1Is",
  })
  @IsNotEmpty({ message: "Refresh token is required" })
  refreshToken: string;

  @ApiProperty({ example: "Admin" })
  @IsNotEmpty({ message: "Role is required" })
  role: string;
}
