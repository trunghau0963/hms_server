import { IsEmail, IsNotEmpty, Matches, MinLength, IsDate } from "class-validator";

export class registerDto {
    @IsNotEmpty({ message: "Email is required" })
    @IsEmail({}, { message: "Email is invalid" })
    email: string;

    @IsNotEmpty({ message: "Phone number is required" })
    @MinLength(10, { message: "Phone number too short" })
    @Matches(/^[0-9]{10}$/, {
        message: "Phone number invalid",
    })
    phoneNumber: string;

    @IsNotEmpty({ message: "Password is required" })
    @MinLength(8, { message: "Password too short" })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: "Password too weak, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
    })
    password: string;

    @IsNotEmpty({ message: "Username is required" })
    @MinLength(2, { message: "Username too short" })
    userName: string;

    @IsNotEmpty({ message: "Role is required" })
    role: string;
}

export class loginDtoByEmail {
    @IsNotEmpty({ message: "Username is required" })
    @IsEmail({}, { message: "Email is invalid" })
    userName: string;

    @IsNotEmpty({ message: "Password is required" })
    @MinLength(8, { message: "Password too short" })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: "Password too weak, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
    })
    password: string;

    @IsNotEmpty({ message: "Role is required" })
    role: string;
}

export class loginDtoByPhone {

    @IsNotEmpty({ message: "Phone number is required" })
    @MinLength(10, { message: "Phone number too short" })
    @Matches(/^[0-9]{10}$/, {
        message: "Phone number invalid",
    })
    phoneNumber: string;

    @IsNotEmpty({ message: "Password is required" })
    @MinLength(8, { message: "Password too short" })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: "Password too weak",
    })
    password: string;

    @IsNotEmpty({ message: "Role is required" })
    role: string;
}