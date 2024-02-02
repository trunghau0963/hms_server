import { IsEmail, IsNotEmpty, Matches, MinLength, IsDate } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AddServiceDto {
    @ApiProperty({ example: 'Teeth Cleaning' })
    @IsNotEmpty({ message: "serviceName is required" })
    serviceName: string;

    @ApiProperty({ example: '50' })
    @IsNotEmpty({ message: "price is required" })
    price: number;

    @ApiProperty({ example: false })
    @IsNotEmpty({ message: "isDeleted is required" })
    isDeleted: boolean;
}

export class ServiceDto extends AddServiceDto {

    @ApiProperty({ example: 'ID_SERVICE_1' })
    @IsNotEmpty({ message: "idService is required" })
    id: string;
}