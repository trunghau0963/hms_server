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

    async addDrug(data: any): Promise<Drug> {
        const response = this.prismaService.drug.create({
            data: {
                idBatch: data.idBatch,
                idDrug: data.idDrug,
                drugName: data.drugName,
                unit: data.unit,
                indicator: data.indicator,
                quantity: data.quantity,
                expireDate: data.expireDate,
                price: data.price,
                isDelete: false
            }
        });
        return response;
    }

    async updateDrug(id: string): Promise<Drug> {

        const drug = await this.prismaService.drug.findUnique({
            where: {
                idBatch: id
            }
        });

        const response = this.prismaService.drug.update({
            where: {
                idBatch: id
            },
            data: {
                isDelete: !drug.isDelete
            }
        });
        return response;
    }

    async deleteDrug(id: string): Promise<Drug> {
        const response = this.prismaService.drug.delete({
            where: {
                idBatch: id
            }
        });
        return response;
    }
}
