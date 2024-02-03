import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Appointment, Dentist, Patient, Prescription, Record, Schedule, ServiceIndicator } from '@prisma/client';
import { ScheduleDto } from './dtos/schedule.dtos';
import { ScheduleService } from './schedule.service';
import { ScheduleEntity } from './entities/schedule.entity';
import { Public } from 'src/public.decorator';
import { Roles } from 'src/roles.decoration';
import { Role } from 'src/auth/enum';


@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
    constructor(private scheduleService: ScheduleService) { }

    @Public()
    @Get()
    @ApiOperation({ summary: 'Get all schedule' })
    @ApiResponse({ status: 200, description: 'Get all schedule', type: [ScheduleEntity] })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @HttpCode(HttpStatus.OK)
    async getAllSchedule(): Promise<Schedule[]> {
        return this.scheduleService.getAllSchedule();
    }

    @Public()
    @Get(':id')
    @ApiParam({ name: 'id', required: true, type: String, example: '32zzbq' })
    @ApiOperation({ summary: 'Get schedule by id of Dentist' })
    @ApiResponse({ status: 200, description: 'Get schedule by id', type: ScheduleEntity })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async getScheduleById(@Req() req: any): Promise<Schedule[]> {
        return this.scheduleService.getScheduleById(req.params.id);
    }

    @Roles(Role.Dentist)
    @Post('add')
    @ApiBody({ type: ScheduleDto })
    @ApiOperation({ summary: 'Add schedule' })
    @ApiResponse({ status: 200, description: 'Add schedule', type: ScheduleDto })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    @HttpCode(HttpStatus.OK)
    async addSchedule(@Body() data: ScheduleDto): Promise<Schedule> {
        return this.scheduleService.addSchedule(data);
    }

    @Roles(Role.Dentist)
    @Delete('delete')
    @ApiBody({ type: ScheduleDto })
    @ApiOperation({ summary: 'Delete schedule' })
    @ApiResponse({ status: 200, description: 'Delete schedule', type: ScheduleDto })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    async deleteSchedule(@Body() data: ScheduleDto): Promise<Schedule> {
        return this.scheduleService.deleteSchedule(data);
    }
}
