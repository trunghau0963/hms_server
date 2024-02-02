import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ServiceService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async getAllService(): Promise<any> {
        const service = await this.prismaService.service.findMany();
        return service;
    }

    async getServiceById(id: string): Promise<any> {
        const service = await this.prismaService.service.findMany({
            where: {
                id: id
            }
        });
        return service;
    }

    async addService(data: any): Promise<any> {
        const service = this.prismaService.service.create({
            data: {
                serviceName: data.serviceName,
                price: data.price,
                isDelete: data.isDelete
            }
        });
        return service;
    }

    async deleteService(data: any): Promise<any> {
        const service = this.prismaService.service.delete({
            where: {
                id: data.id
            }
        });
        return service;
    }

    async updateService(data: any): Promise<any> {
        const service = this.prismaService.service.update({
            where: {
                id: data.id
            },
            data: {
                serviceName: data.serviceName,
                price: data.price,
                isDelete: data.isDelete
            }
        });
        return service;
    }

}
