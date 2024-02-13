import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Appointment, Dentist, Patient, Prescription, Record, Schedule, ServiceIndicator } from '@prisma/client';
import { AppointmentService } from './appointment.service';
import { AddAppointmentDto, AppointmentDto, DeleteAppointmentDto } from './dtos/appointment.dtos';
import { AppointmentEntity } from './entities/appointment.entity';
import { Public } from 'src/public.decorator';
import { Role } from 'src/auth/enum';
import { Roles } from 'src/roles.decoration';

@ApiTags('Appointment')
@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) { }

    @Public()
    @Get()
    @ApiOperation({ summary: 'Get all appointment' })
    @ApiResponse({ status: 200, description: 'Get all appointment', type: AppointmentEntity })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @HttpCode(HttpStatus.OK)
    async getAllAppointment(): Promise<Appointment[]> {
        return this.appointmentService.getAllAppointment();
    }

    @Public()
    @Get(':id')
    @ApiParam({ name: 'id', required: true, type: String, example: '32zzbq' })
    @ApiOperation({ summary: 'Get appointment by id' })
    @ApiResponse({ status: 200, description: 'Get appointment by id', type: AppointmentEntity })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @HttpCode(HttpStatus.OK)
    async getAppointmentById(@Req() req: any): Promise<Appointment[]> {
        return this.appointmentService.getAppointmentById(req.params.id);
    }

    @Public()
    @Post('add')
    @ApiBody({ type: AppointmentDto })
    @ApiOperation({ summary: 'Add appointment' })
    @ApiResponse({ status: 200, description: 'Add appointment', type: AddAppointmentDto })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @HttpCode(HttpStatus.OK)
    async addAppointment(@Body() data: any): Promise<any> {
        return this.appointmentService.addAppointment(data);
    }

    @Roles(Role.Dentist)
    @ApiOperation({ summary: 'Delete appointment' })
    @ApiResponse({ status: 200, description: 'Delete appointment', type: DeleteAppointmentDto })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Delete('delete/:id/:date/:time')
    @ApiParam({ name: 'id', required: true, type: String, example: '32zzbq' })
    @ApiParam({ name: 'date', required: true, type: String, example: '2022-12-12' })
    @ApiParam({ name: 'time', required: true, type: String, example: '12:00' })
    async deleteAppointment(@Req() req: any): Promise<any> {
        return this.appointmentService.deleteAppointment(req.params.id, req.params.date, req.params.time);
    }
}
