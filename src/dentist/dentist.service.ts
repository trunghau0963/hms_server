import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Appointment, Dentist, Patient, Prescription, Record, Schedule, ServiceIndicator } from '@prisma/client';
import { addScheduleDto, deleteScheduleDto } from './dtos/dentist.dtos';


@Injectable()
export class DentistService {
    constructor(
        private prismaService: PrismaService,
        // private jwtService: JwtService
    ) { }

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

    async getAppointmentById(id: string): Promise<Appointment[]> {
        const appointments = await this.prismaService.appointment.findMany({
            where: {
                idDentist: id
            }
        });

        const response = await Promise.all(appointments.map(async (item) => {
            const patient = await this.prismaService.patient.findFirst({
                where: {
                    id: item.idPatient
                }
            });
            return { ...item, patient };
        }));

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

    async getRecordById(id: string): Promise<Record[]> {
        const records = await this.prismaService.record.findMany({
            where: {
                idDentist: id
            }
        });

        const response = await Promise.all(records.map(async (item) => {
            const patient = await this.prismaService.patient.findFirst({
                where: {
                    id: item.idPatient
                }
            });
            return { ...item, patient };
        }));
        return response;
    }

    async getPrecriptionById(id: string): Promise<Prescription[]> {
        const response = this.prismaService.prescription.findMany({
            where: {
                idRecord: id
            }
        });
        return response;
    }

    async getServiceIndicatorById(id: string): Promise<ServiceIndicator[]> {
        const response = this.prismaService.serviceIndicator.findMany({
            where: {
                idRecord: id
            }
        });
        return response;
    }

    async addSchedule(id: string, data: addScheduleDto): Promise<Schedule> {
        const date = data.date;
        const time = data.time;

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

    async addAppointment(data: any): Promise<any> {
        const schedule = this.prismaService.schedule.delete({
            where: {
                idDentist_dateOfAppointment_timeOfAppointment: {
                    idDentist: data.idDentist,
                    dateOfAppointment: data.date,
                    timeOfAppointment: data.time
                }
            }
        });
        const appointment = this.prismaService.appointment.create({
            data: {
                patient: {
                    connect: {
                        id: data.idPatient
                    }
                },
                dentist: {
                    connect: {
                        id: data.idDentist
                    }
                },
                dateOfAppointment: data.date,
                timeOfAppointment: data.time,
            }

        })
        const response = await Promise.all([schedule, appointment]);
        return response;
    }

    async addRecord(data: any): Promise<any> {
        const appointment = this.prismaService.appointment.delete({
            where: {
                idDentist_dateOfAppointment_timeOfAppointment: {
                    idDentist: data.idDentist,
                    dateOfAppointment: data.date,
                    timeOfAppointment: data.time
                }
            }
        })
        const record = this.prismaService.record.create({
            data: {
                patient: {
                    connect: {
                        id: data.idPatient
                    }
                },
                dentist: {
                    connect: {
                        id: data.idDentist
                    }
                },
                dateOfAppointment: data.date,
                timeOfAppointment: data.time,
                diagnose: data.diagnose,
                symptom: data.symptom,
            }

        })
        const response = await Promise.all([appointment, record]);
        return response;
    }

    async addPrecription(data: any): Promise<any> {
        const drug = await this.prismaService.drug.findFirst({
            where: {
                drugName: data.drugName
            }
        })

        const precription = this.prismaService.prescription.create({
            data: {
                record: {
                    connect: {
                        id: data.idRecord
                    }
                },
                drug: {
                    connect: {
                        idBatch: drug.idBatch,
                        idDrug: drug.idDrug
                    }
                },
                quantity: data.quantity,
                description: data.description,
                total: data.quantity * drug.price,
            }
        });

        const response = await Promise.all([drug, precription]);
        return response;
    }

    async addServiceIndicator(data: any): Promise<any> {

        const service = await this.prismaService.service.findFirst({
            where: {
                serviceName: data.serviceName
            }
        })
        const serviceIndicator = this.prismaService.serviceIndicator.create({
            data: {
                record: {
                    connect: {
                        id: data.idRecord
                    }
                },
                service: {
                    connect: {
                        id: service.id
                    }
                },
                total: data.quantity*service.price,
            }
        });
        const response = await Promise.all([service, serviceIndicator]);
        return response;
    }

    async deleteSchedule(id: string, data: deleteScheduleDto): Promise<Schedule> {
        const date = data.date;
        const time = data.time;

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

    async deleteAppointment(id: string, data: any): Promise<any> {
        const date = data.date;
        const time = data.time;

        const schedule = this.prismaService.schedule.create({
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

        const appointment = this.prismaService.appointment.delete({
            where: {
                idDentist_dateOfAppointment_timeOfAppointment: {
                    idDentist: id,
                    dateOfAppointment: date,
                    timeOfAppointment: time
                }
            }
        });

        const response = await Promise.all([schedule, appointment]);
        return response;
    }
}
