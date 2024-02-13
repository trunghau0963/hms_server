import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Dentist, Patient, Schedule, Staff } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ChangeStatus } from './dtos/user.dtos';

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService,
        // private jwtService: JwtService
    ) { }

    async getAllPatient(): Promise<Patient[]> {
        const response = await this.prismaService.patient.findMany();
        return response;
    }

    async getPatientById(id: string): Promise<Patient> {
        const response = this.prismaService.patient.findUnique({
            where: {
                id: id
            }
        });
        return response;
    }

    async getNameAllPatient(): Promise<string[]> {
        const patients = await this.prismaService.patient.findMany();
        const NameArray: string[] = patients.map((patient) => `${patient.userName} - ${patient.id}`);
        return NameArray;
    }

    async getAllDentist(): Promise<Dentist[]> {
        const response = this.prismaService.dentist.findMany();
        return response;
    }

    async getDentistById(id: string): Promise<Dentist> {
        const response = this.prismaService.dentist.findUnique({
            where: {
                id: id
            }
        });
        if (!response) {
            throw new Error('Dentist not found');
        }
        else {
            return response;
        }
    }

    async getAllStaff(): Promise<Staff[]> {
        const response = this.prismaService.staff.findMany();
        return response;
    }

    async getStaffById(id: string): Promise<Staff> {
        const response = this.prismaService.staff.findUnique({
            where: {
                id: id
            }
        });
        return response;
    }

    async changStatusUser(id: string, role: string): Promise<any> {
        if (role === 'patient') {
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
        } else if (role === 'dentist') {
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
        else if (role === 'staff') {
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
        else if(role === 'drug'){
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
