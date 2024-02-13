import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { JwtService } from "@nestjs/jwt";
import {
  Appointment,
  Dentist,
  Patient,
  Prescription,
  Record,
  Schedule,
  ServiceIndicator,
} from "@prisma/client";

@Injectable()
export class AppointmentService {
  constructor(private prismaService: PrismaService) {}

  async getAllAppointment(): Promise<Appointment[]> {
    const appointments = await this.prismaService.appointment.findMany();
    const response = await Promise.all(
      appointments.map(async (item) => {
        const patient = await this.prismaService.patient.findFirst({
          where: {
            id: item.idPatient,
          },
        });
        return { ...item, patient };
      }),
    );
    return response;
  }

  async getAppointmentById(id: string): Promise<Appointment[]> {
    const appointments = await this.prismaService.appointment.findMany({
      where: {
        idDentist: id,
      },
    });

    const response = await Promise.all(
      appointments.map(async (item) => {
        const patient = await this.prismaService.patient.findFirst({
          where: {
            id: item.idPatient,
          },
        });
        return { ...item, patient };
      }),
    );

    return response;
  }

  async addAppointment(data: any): Promise<any> {
    const schedule = this.prismaService.schedule.delete({
      where: {
        idDentist_dateOfAppointment_timeOfAppointment: {
          idDentist: data.idDentist,
          dateOfAppointment: data.date,
          timeOfAppointment: data.time,
        },
      },
    });
    const appointment = this.prismaService.appointment.create({
      data: {
        patient: {
          connect: {
            id: data.idPatient,
          },
        },
        dentist: {
          connect: {
            id: data.idDentist,
          },
        },
        dateOfAppointment: data.date,
        timeOfAppointment: data.time,
      },
    });
    const response = await Promise.all([schedule, appointment]);
    return response;
  }

  async deleteAppointment(id: string, date: any, time: any): Promise<any> {
    const schedule = this.prismaService.schedule.create({
      data: {
        timeOfAppointment: time,
        dateOfAppointment: date,
        dentist: {
          connect: {
            id: id,
          },
        },
      },
    });

    const appointment = this.prismaService.appointment.delete({
      where: {
        idDentist_dateOfAppointment_timeOfAppointment: {
          idDentist: id,
          dateOfAppointment: date,
          timeOfAppointment: time,
        },
      },
    });

    const response = await Promise.all([schedule, appointment]);
    return response;
  }
}
