import { IsEmail, IsNotEmpty, Matches, MinLength, IsDate } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class RecordDto {
    @ApiProperty({ example: '1e41m4' })
    idPatient: string;

    @ApiProperty({ example: '32zzbq' })
    idDentist: string;

    @ApiProperty({ example: '2024-02-02T00:00:00.000Z' })
    date: string;

    @ApiProperty({ example: '024-02-02T00:00:00.000Z' })
    time: string;
}

export class AddRecordDto extends RecordDto {
    @ApiProperty({ example: 'test diagnose' })
    diagnose: string;

    @ApiProperty({ example: 'test symptom' })
    symptom: string;
}

export class PrescriptionDto {

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

export class ServiceIndicatorDto {

    @ApiProperty({ example: 'cls1kwo060000ba6n2cwkzx00' })
    idRecord: string;

    @ApiProperty({ example: 'Service_1' })
    idService: string;

    @ApiProperty({ example: 'Teeth Cleaning' })
    serviceName: string;

    @ApiProperty({ example: '1' })
    quantity: number;
}

export class DeleteDrugPrescription {
    @ApiProperty({ example: 'cls1kwo060000ba6n2cwkzx00' })
    idRecord: string;

    @ApiProperty({ example: 'Batch_1' })
    idBatch: string;

    @ApiProperty({ example: 'Drug_1' })
    idDrug: string;

    @ApiProperty({ example: 'Paracetamol' })
    drugName: string;

    @ApiProperty({ example: '10' })
    quantity: number;
}

export class UpdateRecordDto extends RecordDto {
    static updateTime: number;

    @ApiProperty({ example: 'cls1kwo060000ba6n2cwkzx00' })
    id: string;

    @ApiProperty({ example: '0' })
    total: number;

    @ApiProperty()
    diagnose: string;

    @ApiProperty()
    symptom: string;

    constructor() {
        super();
        this.diagnose = `update diagnose case ${UpdateRecordDto.updateTime++}`;
        this.symptom = `update symptom ${UpdateRecordDto.updateTime++}`;
    }
}
