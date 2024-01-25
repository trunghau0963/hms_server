import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { AuthGuard } from '@nestjs/passport';
import { Patient, Schedule } from '@prisma/client';
import { Public } from 'src/auth/auth.controller';

@ApiTags('Patient')
@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) { }

    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @Public()
    @Get()
    async getAllPatient(@Req() req: any) : Promise<Patient[]> {
        return this.patientService.getAllPatient();
    }

    @Public()
    @Get('all-name')
    async getNameAllPatient(@Req() req: any): Promise<string[]> {
        return this.patientService.getNameAllPatient();
    }

    @Public()
    @Get(':id')
    async getPatientById(@Req() req: any): Promise<Patient> {
        return this.patientService.getPatientById(req.params.id);
    }

    @Public()
    @Get('schedule-dentist/:id')
    async getScheduleById(@Req() req: any): Promise<Schedule[]> {
        return this.patientService.getScheduleById(req.params.id);
    }


}
