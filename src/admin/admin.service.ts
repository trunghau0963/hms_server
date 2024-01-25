import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { changeStatus } from './dtos/admin.dtos';

@Injectable()
export class AdminService {

    constructor(
        private prismaService: PrismaService,
        // private jwtService: JwtService
    ) { }
    async changStatusUser(id: string, data: changeStatus): Promise<any> {
        if (data.role === 'Patient') {
            const user = await this.prismaService.patient.findUnique({
                where: {
                    id: id
                }
            });
            const islock = user.islock;
            const response = await this.prismaService.patient.update({
                where: {
                    id: id
                },
                data: {
                    islock: !islock
                }
            });
            return response;
        } else if (data.role === 'Dentist') {
            const user = await this.prismaService.dentist.findUnique({
                where: {
                    id: id
                }
            });
            const islock = user.islock;
            const response = await this.prismaService.dentist.update({
                where: {
                    id: id
                },
                data: {
                    islock: !islock
                }
            });
            return response;
        }
        else if (data.role === 'Staff') {
            const user = await this.prismaService.staff.findUnique({
                where: {
                    id: id
                }
            });
            const islock = user.islock;
            const response = await this.prismaService.staff.update({
                where: {
                    id: id
                },
                data: {
                    islock: !islock
                }
            });
            return response;
        }
        else if(data.role === 'Drug'){
            const drug = await this.prismaService.drug.findUnique({
                where: {
                    idBatch: id
                }
            });
            const isDelete = drug.isDelete;
            const response = await this.prismaService.drug.update({
                where: {
                    idBatch: id
                },
                data: {
                    isDelete: !isDelete
                }
            });
            return response;
        }
        else {
            throw new HttpException({ message: "Role is not exist." }, HttpStatus.UNAUTHORIZED)
        }
    }
}
