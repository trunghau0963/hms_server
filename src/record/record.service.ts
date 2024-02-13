import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prescription, Record, ServiceIndicator } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class RecordService {
  constructor(private prismaService: PrismaService) {}

  async getRecordByIdDentist(id: string): Promise<Record[]> {
    const records = await this.prismaService.record.findMany({
      where: {
        idDentist: id,
      },
    });

    const response = await Promise.all(
      records.map(async (item) => {
        const patient = await this.prismaService.patient.findFirst({
          where: {
            id: item.idPatient,
          },
        });
        const prescriptions = await this.prismaService.prescription.findMany({
          where: {
            idRecord: item.id,
          },
        });
        const serviceIndicators =
          await this.prismaService.serviceIndicator.findMany({
            where: {
              idRecord: item.id,
            },
          });
        return { ...item, prescriptions, serviceIndicators, patient };
      }),
    );
    return response;
  }

  async getAllRecord(): Promise<Record[]> {
    const records = await this.prismaService.record.findMany();

    if (!records) {
      throw new HttpException(
        { message: "Record not found" },
        HttpStatus.NOT_FOUND,
      );
    } else {
      const response = await Promise.all(
        records.map(async (item) => {
          const prescriptions = await this.prismaService.prescription.findMany({
            where: {
              idRecord: item.id,
            },
          });
          const serviceIndicators =
            await this.prismaService.serviceIndicator.findMany({
              where: {
                idRecord: item.id,
              },
            });
          return { ...item, prescriptions, serviceIndicators };
        }),
      );
      return response;
    }
  }

  async getRecordById(id: string): Promise<any> {
    const record = await this.prismaService.record.findFirst({
      where: {
        id: id,
      },
    });

    if (!record) {
      throw new HttpException(
        { message: "Record not found" },
        HttpStatus.NOT_FOUND,
      );
    }
    const prescriptions = await this.prismaService.prescription.findMany({
      where: {
        idRecord: record.id,
      },
    });

    const serviceIndicators =
      await this.prismaService.serviceIndicator.findMany({
        where: {
          idRecord: record.id,
        },
      });

    return { ...record, prescriptions, serviceIndicators };
  }

  async getPrescriptionById(id: string): Promise<Prescription[]> {
    const response = this.prismaService.prescription.findMany({
      where: {
        idRecord: id,
      },
    });
    // if ((await response).length === 0)
    //   throw new HttpException(
    //     { message: "Prescription not found" },
    //     HttpStatus.NOT_FOUND,
    //   );
    return response;
  }

  async getServiceIndicatorById(id: string): Promise<ServiceIndicator[]> {
    const response = this.prismaService.serviceIndicator.findMany({
      where: {
        idRecord: id,
      },
    });
    // if ((await response).length === 0)
    //   throw new HttpException(
    //     { message: "Service Indicator not found" },
    //     HttpStatus.NOT_FOUND,
    //   );
    return response;
  }

  async addRecord(data: any): Promise<any> {
    const existingRecord = await this.prismaService.record.findFirst({
      where: {
        AND: [
          { dateOfAppointment: data.date },
          { timeOfAppointment: data.time },
        ],
      },
    });

    if (existingRecord?.id) {
      console.log("exist: ", existingRecord?.id);
      throw new HttpException(
        { message: "Record already exists" },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const record = await this.prismaService.record.create({
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
          diagnose: data.diagnose,
          symptom: data.symptom,
        },
      });

      //   await this.prismaService.appointment.delete({
      //     where: {
      //       idDentist_dateOfAppointment_timeOfAppointment: {
      //         idDentist: data.idDentist,
      //         dateOfAppointment: data.date,
      //         timeOfAppointment: data.time,
      //       },
      //     },
      //   });

      return record;
    }
  }

  async addPrescription(data: any): Promise<any> {
    const drug = await this.prismaService.drug.findFirst({
      where: {
        OR: [
          {
            idBatch: data.idBatch,
            idDrug: data.idDrug,
          },
          {
            drugName: data.drugName,
          },
        ],
      },
    });

    if (!drug) {
      throw new HttpException(
        { message: "Drug not found" },
        HttpStatus.NOT_FOUND,
      );
    }

    const alreadyPrescription = await this.prismaService.prescription.findFirst(
      {
        where: {
          drug: {
            drugName: drug.drugName,
          },
        },
      },
    );

    if (alreadyPrescription) {
      throw new HttpException(
        { message: "Drug already exists" },
        HttpStatus.BAD_REQUEST,
      );
    }

    const precription = await this.prismaService.prescription.create({
      data: {
        record: {
          connect: {
            id: data.idRecord,
          },
        },
        drug: {
          connect: {
            idBatch: drug.idBatch,
            idDrug: drug.idDrug,
          },
        },
        quantity: data.quantity,
        description: data.description,
        total: data.quantity * drug.price,
      },
    });

    await this.prismaService.drug.update({
      where: {
        idBatch: drug.idBatch,
        idDrug: drug.idDrug,
      },
      data: {
        quantity: drug.quantity - data.quantity,
      },
    });

    const record = await this.prismaService.record.update({
      where: {
        id: data.idRecord,
      },
      data: {
        total: {
          increment: data.quantity * drug.price,
        },
      },
    });

    const response = await Promise.all([record, precription]);
    return response;
  }

  async addServiceIndicator(data: any): Promise<any> {
    const service = await this.prismaService.service.findFirst({
      where: {
        OR: [{ id: data.idService }, { serviceName: data.serviceName }],
      },
    });

    if (!service) {
      throw new HttpException(
        { message: "Service not found" },
        HttpStatus.NOT_FOUND,
      );
    }

    const alreadyServiceIndicator =
      await this.prismaService.serviceIndicator.findFirst({
        where: {
          service: {
            serviceName: service.serviceName,
          },
        },
      });
    if (alreadyServiceIndicator)
      throw new HttpException(
        { message: "Service already exists" },
        HttpStatus.BAD_REQUEST,
      );
    else {
      const serviceIndicator = this.prismaService.serviceIndicator.create({
        data: {
          record: {
            connect: {
              id: data.idRecord,
            },
          },
          service: {
            connect: {
              id: service.id,
            },
          },
          quantity: data.quantity,
          total: data.quantity * service.price,
        },
      });

      const record = await this.prismaService.record.update({
        where: {
          id: data.idRecord,
        },
        data: {
          total: {
            increment: data.quantity * service.price,
          },
        },
      });

      const response = await Promise.all([record, serviceIndicator]);
      return response;
    }
  }

  async deleteRecord(id: string): Promise<any> {
    await this.prismaService.prescription.deleteMany({
      where: {
        idRecord: id,
      },
    });

    const record = await this.prismaService.record.delete({
      where: {
        id: id,
      },
    });
    const response = await Promise.all([record]);
    return response;
  }

  async deleteDrugPrescription(
    idRecord: string,
    idBatch: string,
    idDrug: string,
  ): Promise<any> {
    const drug = await this.prismaService.drug.findFirst({
      where: {
        idBatch: idBatch,
        idDrug: idDrug,
      },
    });

    if (!drug) {
      throw new HttpException(
        { message: "Drug not found" },
        HttpStatus.NOT_FOUND,
      );
    }

    const prescription = await this.prismaService.prescription.findFirst({
      where: {
        OR: [
          {
            idBatch: drug.idBatch,
            idDrug: drug.idDrug,
          },
          {
            drug: {
              drugName: drug.drugName,
            },
          },
        ],
      },
    });

    if (!prescription) {
      throw new HttpException(
        { message: "Prescription not found" },
        HttpStatus.NOT_FOUND,
      );
    }

    const deleteDrugPrecription = await this.prismaService.prescription.delete({
      where: {
        idBatch: drug.idBatch,
        idDrug: drug.idDrug,
        idRecord: idRecord,
      },
    });

    await this.prismaService.drug.update({
      where: {
        idBatch: drug.idBatch,
        idDrug: drug.idDrug,
      },
      data: {
        quantity: drug.quantity + prescription.quantity,
      },
    });

    const record = await this.prismaService.record.update({
      where: {
        id: idRecord,
      },
      data: {
        total: {
          decrement: prescription.quantity * drug.price,
        },
      },
    });

    const response = await Promise.all([record, deleteDrugPrecription]);
    return response;
  }

  async deletePrescription(data: any): Promise<any> {
    const prescriptions = await this.prismaService.prescription.deleteMany({
      where: {
        idRecord: data.idRecord,
      },
    });
    const response = await Promise.all([prescriptions]);
    return response;
  }

  async deleteServiceInServiceIndicator(
    idRecord: string,
    idService: string,
  ): Promise<any> {
    const service = await this.prismaService.service.findFirst({
      where: {
        id: idService,
      },
    });

    if (!service) {
      throw new HttpException(
        { message: "Service not found" },
        HttpStatus.NOT_FOUND,
      );
    }

    const serviceIndicator = await this.prismaService.serviceIndicator.delete({
      where: {
        idRecord_idService: {
          idRecord: idRecord,
          idService: service.id,
        },
      },
    });

    const record = await this.prismaService.record.update({
      where: {
        id: idRecord,
      },
      data: {
        total: {
          decrement: serviceIndicator.quantity * service.price,
        },
      },
    });
    const response = await Promise.all([record, serviceIndicator]);
    return response;
  }

  async deleteServiceIndicator(data: any): Promise<any> {
    const serviceIndicator =
      await this.prismaService.serviceIndicator.deleteMany({
        where: {
          idRecord: data.id,
        },
      });
    const response = await Promise.all([serviceIndicator]);
    return response;
  }

  async deleteAllRecord(): Promise<any> {
    const records = await this.prismaService.record.deleteMany();
    const response = await Promise.all([records]);
    return response;
  }

  async updateRecord(data: any): Promise<any> {
    const record = await this.prismaService.record.update({
      where: {
        id: data.id,
      },
      data: {
        total: data.total,
        diagnose: data.diagnose,
        symptom: data.symptom,
      },
    });
    const response = await Promise.all([record]);
    return response;
  }
}
