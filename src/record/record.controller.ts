import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Appointment, Dentist, Patient, Prescription, Record, Schedule, ServiceIndicator } from '@prisma/client';
import { RecordService } from './record.service';
import { PrescriptionEntity, RecordEntity, ServiceIndicatorEntity } from './entities/record.entities';
import { AddRecordDto, DeleteDrugPrecription, PrescriptionDto, ServiceIndicatorDto, UpdateRecordDto } from './dtos/record.dtos';
import { Public } from 'src/public.decorator';
import { Role } from 'src/auth/enum';
import { Roles } from 'src/roles.decoration';

@ApiTags('Record')
@Controller('record')
export class RecordController {
    constructor(private readonly recordService: RecordService) { }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Dentist, Role.Staff, Role.Admin)
    @Get('dentist/:id')
    @ApiParam({ name: 'id', required: true, type: String, example: '32zzbq' })
    @ApiOperation({ summary: 'Get record by id dentist' })
    @ApiResponse({ status: 200, description: 'Get record by id dentist', type: RecordEntity })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @HttpCode(HttpStatus.OK)
    async getRecordByIdDentist(@Req() req: any): Promise<Record[]> {
        return this.recordService.getRecordByIdDentist(req.params.id);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Admin, Role.Staff)
    @Get()
    @ApiOperation({ summary: 'Get all record' })
    @ApiResponse({ status: 200, description: 'Get all record', type: RecordEntity })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @HttpCode(HttpStatus.OK)
    async getAllRecord(): Promise<Record[]> {
        return this.recordService.getAllRecord();
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Admin, Role.Staff, Role.Dentist)
    @Get(':id')
    @ApiParam({ name: 'id', required: true, type: String, example: 'cls1kwo060000ba6n2cwkzx00' })
    @ApiOperation({ summary: 'Get record by id' })
    @ApiResponse({ status: 200, description: 'Get record by id', type: RecordEntity })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @HttpCode(HttpStatus.OK)
    async getRecordById(@Req() req: any): Promise<Record[]> {
        return this.recordService.getRecordById(req.params.id);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Dentist)
    @Get('precription/:id')
    @ApiParam({ name: 'id', required: true, type: String, example: 'cls1kwo060000ba6n2cwkzx00' })
    @ApiOperation({ summary: 'Get precription by id' })
    @ApiResponse({ status: 200, description: 'Get precription by id', type: PrescriptionEntity })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    async getPrecriptionById(@Req() req: any): Promise<Prescription[]> {
        return this.recordService.getPrecriptionById(req.params.id);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Dentist)
    @Get('service-indicator/:id')
    @ApiParam({ name: 'id', required: true, type: String, example: 'cls1kwo060000ba6n2cwkzx00' })
    @ApiOperation({ summary: 'Get service indicator by id' })
    @ApiResponse({ status: 200, description: 'Get service indicator by id', type: ServiceIndicatorEntity })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    async getServiceIndicatorById(@Req() req: any): Promise<ServiceIndicator[]> {
        return this.recordService.getServiceIndicatorById(req.params.id);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Dentist)
    @Post('add-record')
    @ApiBody({ type: AddRecordDto })
    @ApiOperation({ summary: 'Add record' })
    @ApiResponse({ status: 200, description: 'Add record', type: RecordEntity })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    @HttpCode(HttpStatus.OK)
    async addRecord(@Req() req: any, @Body() data: any): Promise<any> {
        return this.recordService.addRecord(data);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Dentist)
    @Post('add-precription')
    @ApiBody({ type: PrescriptionDto })
    @ApiOperation({ summary: 'Add precription' })
    @ApiResponse({ status: 200, description: 'Add precription', type: RecordEntity })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    @HttpCode(HttpStatus.OK)
    async addPrecription(@Req() req: any, @Body() data: any): Promise<any> {
        return this.recordService.addPrecription(data);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Dentist)
    @Post('add-service-indicator')
    @ApiBody({ type: ServiceIndicatorDto })
    @ApiOperation({ summary: 'Add service indicator' })
    @ApiResponse({ status: 200, description: 'Add service indicator', type: RecordEntity })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    @HttpCode(HttpStatus.OK)
    async addServiceIndicator(@Req() req: any, @Body() data: any): Promise<any> {
        return this.recordService.addServiceIndicator(data);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Dentist, Role.Staff, Role.Admin)
    @Delete('delete')
    @ApiBody({ type: RecordEntity })
    @ApiOperation({ summary: 'Delete record' })
    @ApiResponse({ status: 200, description: 'Delete record', type: RecordEntity })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    @HttpCode(HttpStatus.OK)
    async deleteRecord(@Req() req: any, @Body() data: any): Promise<any> {
        return this.recordService.deleteRecord(data);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Dentist)
    @Delete('delete-drug/precription')
    @ApiBody({ type: DeleteDrugPrecription })
    @ApiOperation({ summary: 'Delete drug precription' })
    @ApiResponse({ status: 200, description: 'Delete drug precription', type: RecordEntity })
    @ApiResponse({ status: 404, description: 'Not Found'})
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    @HttpCode(HttpStatus.OK)
    async deleteDrugPrecription( @Body() data: any): Promise<any> {
        return this.recordService.deleteDrugPrecription(data);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Dentist)
    @Delete('delete-precription')
    @ApiBody({ type: PrescriptionDto })
    @ApiOperation({ summary: 'Delete all precription' })
    @ApiResponse({ status: 200, description: 'Delete precription', type: RecordEntity })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    @HttpCode(HttpStatus.OK)
    async deletePrecription(@Req() req: any, @Body() data: any): Promise<any> {
        return this.recordService.deletePrecription(data);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Dentist)
    @Delete('delete-service/service-indicator')
    @ApiBody({ type: ServiceIndicatorDto })
    @ApiOperation({ summary: 'Delete service indicator' })
    @ApiResponse({ status: 200, description: 'Delete service indicator', type: RecordEntity })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    @HttpCode(HttpStatus.OK)
    async deleteService(@Req() req: any, @Body() data: any): Promise<any> {
        return this.recordService.deleteServiceInServiceIndicator(data);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Dentist)
    @Delete('delete-service-indicator')
    @ApiBody({ type: ServiceIndicatorDto })
    @ApiOperation({ summary: 'Delete all service indicator' })
    @ApiResponse({ status: 200, description: 'Delete service indicator', type: RecordEntity })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    @HttpCode(HttpStatus.OK)
    async deleteServiceIndicator(@Req() req: any, @Body() data: any): Promise<any> {
        return this.recordService.deleteServiceIndicator(data);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Admin)
    @Delete('delete-all')
    @ApiOperation({ summary: 'Delete all record' })
    @ApiResponse({ status: 200, description: 'Delete all record', type: RecordEntity })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    @HttpCode(HttpStatus.OK)
    async deleteAllRecord(): Promise<any> {
        return this.recordService.deleteAllRecord();
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Dentist)
    @Put('update-record')
    @ApiBody({ type: UpdateRecordDto })
    @ApiOperation({ summary: 'Update record' })
    @ApiResponse({ status: 200, description: 'Update record', type: RecordEntity })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    @HttpCode(HttpStatus.OK)
    async updateRecord(@Req() req: any, @Body() data: any): Promise<any> {
        return this.recordService.updateRecord(data);
    }

}
