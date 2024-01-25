import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Patient, Schedule } from '@prisma/client';

@Injectable()
export class PatientService {

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
    async getScheduleById(id: string): Promise<Schedule[]> {
        const response = this.prismaService.schedule.findMany({
            where: {
                idDentist: id
            }
        });
        return response;
    }

    async getNameAllPatient(): Promise<string[]> {
        const patients = await this.prismaService.patient.findMany();
        const NameArray: string[] = patients.map((patient) => `${patient.userName} - ${patient.id}`);
        return NameArray;
    }

}
