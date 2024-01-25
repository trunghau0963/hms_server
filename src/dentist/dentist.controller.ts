import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DentistService } from './dentist.service';
import { AuthGuard } from '@nestjs/passport';
import { Appointment, Dentist, Patient, Prescription, Record, Schedule, ServiceIndicator } from '@prisma/client';
import { Public } from 'src/auth/auth.controller';
import { addScheduleDto, deleteScheduleDto } from './dtos/dentist.dtos';

@ApiTags('Dentist')
@Controller('dentist')
export class DentistController {
    constructor(private readonly dentistService: DentistService) { }

    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllDentist(@Req() req: any): Promise<Dentist[]> {
        return this.dentistService.getAllDentist();
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getDentistById(@Req() req: any): Promise<Dentist> {
        console.log('dentist controller')
        return this.dentistService.getDentistById(req.params.id);
    }

    @Public()
    @Get('schedule/:id')
    async getScheduleById(@Req() req: any) : Promise<Schedule[]> {
        return this.dentistService.getScheduleById(req.params.id);
    }

    @Public()
    @Get('appointment/:id')
    async getAppointmentById(@Req() req: any) : Promise<Appointment[]> {
        return this.dentistService.getAppointmentById(req.params.id);
    }

    @Public()
    @Get('record/:id')
    async getRecordById(@Req() req: any) : Promise<Record[]> {
        return this.dentistService.getRecordById(req.params.id);
    }

    @Public()
    @Get('record/precription/:id')
    async getPrecriptionById(@Req() req: any) : Promise<Prescription[]> {
        return this.dentistService.getPrecriptionById(req.params.id);
    }

    @Public()
    @Get('record/service-indicator/:id')
    async getServiceIndicatorById(@Req() req: any) : Promise<ServiceIndicator[]> {
        return this.dentistService.getServiceIndicatorById(req.params.id);
    }

    
    @Public()
    @Post('schedule/:id')
    // @HttpCode(HttpStatus.OK)
    async addSchedule(@Req() req: any, @Body() data: addScheduleDto): Promise<Schedule> {
        return this.dentistService.addSchedule(req.params.id, data);
    }

    @Public()
    @Post('add-appointment')
    @HttpCode(HttpStatus.OK)
    async addAppointment(@Req() req: any, @Body() data: any): Promise<any> {
        return this.dentistService.addAppointment(data);
    }

    @Public()
    @Post('add-record')
    @HttpCode(HttpStatus.OK)
    async addRecord(@Req() req: any, @Body() data: any): Promise<any> {
        return this.dentistService.addRecord(data);
    }

    @Public()
    @Post('add-precription')
    @HttpCode(HttpStatus.OK)
    async addPrecription(@Req() req: any, @Body() data: any): Promise<any> {
        return this.dentistService.addPrecription(data);
    }

    @Public()
    @Post('add-service-indicator')
    @HttpCode(HttpStatus.OK)
    async addServiceIndicator(@Req() req: any, @Body() data: any): Promise<any> {
        return this.dentistService.addServiceIndicator(data);
    }




    @Public()
    @Delete('schedule/:id/delete')
    async deleteSchedule(@Req() req: any, @Body() data: deleteScheduleDto): Promise<Schedule> {
        return this.dentistService.deleteSchedule(req.params.id, data);
    }


    @Public()
    @Delete('appointment/:id/delete')
    async deleteAppointment(@Req() req: any, @Body() data: any): Promise<any> {
        console.log('dentist controller')
        return this.dentistService.deleteAppointment(req.params.id, data);
    }

}
