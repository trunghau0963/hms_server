import { Injectable } from '@nestjs/common';
import { Drug } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DrugService {
    constructor(
        private prismaService: PrismaService,
        // private jwtService: JwtService
    ) { }

    async getAllDrug(): Promise<Drug[]> {
        const response = this.prismaService.drug.findMany();
        return response;
    }

    async getAllDrugAvailable(): Promise<Drug[]> {
        const response = this.prismaService.drug.findMany({
            where: {
                isDelete: false
            }
        });
        return response;
    }

    async getAllDrugUnavailable(): Promise<Drug[]> {
        const response = this.prismaService.drug.findMany({
            where: {
                isDelete: true
            }
        });
        return response;
    }

    async getDrugById(id: string): Promise<Drug> {
        const response = this.prismaService.drug.findUnique({
            where: {
                idBatch: id
            }
        });
        return response;
    }

    async deleteDrug(id: string): Promise<Drug> {
        const response = this.prismaService.drug.update({
            where: {
                idBatch: id
            },
            data: {
                isDelete: true
            }
        });
        return response;
    }
}
