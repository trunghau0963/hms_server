import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Dentist, Patient, Staff } from '@prisma/client';

@Injectable()
export class StaffService {
    constructor(
        private prismaService: PrismaService,
        // private jwtService: JwtService
    ) { }

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
}
