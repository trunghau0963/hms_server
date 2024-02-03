import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddServiceDto, ServiceDto } from './dtos/service.dtos';
import { Public } from 'src/public.decorator';
import { Roles } from 'src/roles.decoration';
import { Role } from 'src/auth/enum';


@ApiTags('Service')
@Controller('service')
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) { }

    @Public()
    @Get()
    @ApiOperation({ summary: 'Get all service' })
    @ApiResponse({ status: 200, description: 'Get all service', type: ServiceDto })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @HttpCode(HttpStatus.OK)
    async getAllService(): Promise<any> {
        return this.serviceService.getAllService();
    }

    @Public()
    @Get(':id')
    @ApiParam({ name: 'id', required: true, type: String, example: 'ID_SERVICE_10' })
    @ApiOperation({ summary: 'Get service by id' })
    @ApiResponse({ status: 200, description: 'Get service by id' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @HttpCode(HttpStatus.OK)
    async getServiceById(@Req() req: any): Promise<any> {
        return this.serviceService.getServiceById(req.params.id);
    }

    @Roles(Role.Admin, Role.Staff)
    @Post('add')
    @ApiBody({ type: AddServiceDto })
    @ApiOperation({ summary: 'Add service' })
    @ApiResponse({ status: 200, description: 'Add service', type: ServiceDto })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    @HttpCode(HttpStatus.OK)
    async addService(@Body() data: any): Promise<any> {
        return this.serviceService.addService(data);
    }

    @Roles(Role.Admin, Role.Staff)
    @Delete('delete')
    @ApiBody({ type: ServiceDto })
    @ApiOperation({ summary: 'Delete service' })
    @ApiResponse({ status: 200, description: 'Delete service', type: ServiceDto })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    @HttpCode(HttpStatus.OK)
    async deleteService(@Body() data: any): Promise<any> {
        return this.serviceService.deleteService(data);
    }

    @Roles(Role.Admin, Role.Staff)
    @Put('update')
    @ApiBody({ type: ServiceDto })
    @ApiOperation({ summary: 'Update service' })
    @ApiResponse({ status: 200, description: 'Update service', type: ServiceDto })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    @HttpCode(HttpStatus.OK)
    async updateService(@Body() data: any): Promise<any> {
        return this.serviceService.updateService(data);
    }

}
