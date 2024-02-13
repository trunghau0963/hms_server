import { IsEmail, IsNotEmpty, Matches, MinLength, IsDate } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { AddRecordDto } from "../dtos/record.dtos";
import { NormalUserEntity } from "src/user/entities/user.entity";

export class PrescriptionEntity {

    @ApiProperty({ example: 'cls1kwo060000ba6n2cwkzx00' })
    idRecord: string;

    @ApiProperty({ example: 'Batch_1' })
    idBatch: string;

    @ApiProperty({ example: 'Drug_1' })
    idDrug: string;

    @ApiProperty({ example: '10' })
    quantity: number;

    @ApiProperty({ example: '3 lan 1 ngay' })
    description: string;

    @ApiProperty({ example: '100' })
    total: number;
}

export class ServiceIndicatorEntity {

    @ApiProperty({ example: 'cls1kwo060000ba6n2cwkzx00' })
    idRecord: string;

    @ApiProperty({ example: 'Service_1' })
    idService: string;

    @ApiProperty({ example: '100' })
    total: number;

    @ApiProperty({ example: '10' })
    quantity: number;
}


export class RecordEntity extends AddRecordDto {

    @ApiProperty({ example: 'cls1kwo060000ba6n2cwkzx00' })
    id: string;

    @ApiProperty({ example: '200' })
    total: number;

    @ApiProperty({ example: PrescriptionEntity })
    prescription: PrescriptionEntity;

    @ApiProperty({ example: ServiceIndicatorEntity })
    serviceIndicator: ServiceIndicatorEntity;

    // @ApiProperty({ example : NormalUserEntity})
    // patient : NormalUserEntity;
}