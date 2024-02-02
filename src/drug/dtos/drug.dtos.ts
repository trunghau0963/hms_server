import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNumber } from 'class-validator';


export class DrugDto {

    @ApiProperty({ example: 'Batch_1' })
    @IsString()
    idBatch: string;

    @ApiProperty({ example: 'Drug_1' })
    @IsString()
    idDrug: string;

    @ApiProperty({ example: 'Paracetamol' })
    @IsString()
    drugName: string;

    @ApiProperty({ example: 'Tablet' })
    @IsString()
    unit: string;

    @ApiProperty({ example: 'Pain relief' })
    @IsString()
    indicator: string;

    @ApiProperty({ example: 100 })
    @IsNumber()
    quantity: number;

    @ApiProperty({ example: '2026-01-16T00:00:00.000Z' })
    @IsDateString()
    expireDate: Date;

    @ApiProperty({ example: 10 })
    @IsNumber()
    price: number;
}

export class DrugAvailableDto extends DrugDto {
    @ApiProperty({ example: false })
    isDelete: boolean;
}

export class DrugUnavailableDto extends DrugDto {
    @ApiProperty({ example: true })
    isDelete: boolean;
}