import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Appointment, Dentist, Patient, Prescription, Record, Schedule, ServiceIndicator } from '@prisma/client';
import { ScheduleDto } from '../schedule/dtos/schedule.dtos';

@Injectable()
export class ScheduleService {
    constructor(
        private prismaService: PrismaService,
        // private jwtService: JwtService
    ) { }

    async getAllSchedule(): Promise<Schedule[]> {
        const response = this.prismaService.schedule.findMany();
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

    async addSchedule(data: ScheduleDto): Promise<Schedule> {
        const date = data.date;
        const time = data.time;
        const id = data.id;

        console.log(time);
        console.log(date);

        const response = this.prismaService.schedule.create({
            data: {
                timeOfAppointment: time,
                dateOfAppointment: date,
                dentist: {
                    connect: {
                        id: id
                    }
                }
            }
        });
        return response;
    }


    async deleteSchedule(id : string, date : any, time: any): Promise<Schedule> {

        const response = this.prismaService.schedule.delete({
            where: {
                idDentist_dateOfAppointment_timeOfAppointment: {
                    idDentist: id,
                    dateOfAppointment: date,
                    timeOfAppointment: time
                }
            }
        });
        return response;
    }

}
