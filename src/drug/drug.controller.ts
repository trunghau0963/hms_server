import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DrugService } from './drug.service';
import { DrugDto, DrugAvailableDto, DrugUnavailableDto } from './dtos/drug.dtos';
import { Public } from 'src/public.decorator';
import { Role } from 'src/auth/enum';
import { Roles } from 'src/roles.decoration';

@ApiTags('Drug')
@Controller('drug')
export class DrugController {
    constructor(private readonly drugService: DrugService) { }

    @Public()
    @Get()
    @ApiOperation({ summary: 'Get all drug' })
    @ApiResponse({ status: 200, description: 'Get all drug', type: [DrugAvailableDto]})
    @ApiResponse({ status: 400, description: 'Bad request' })
    async getAllDrug() {
        return this.drugService.getAllDrug();
    }

    @Public()
    @Get('available')
    @ApiOperation({ summary: 'Get all drug available' })
    @ApiResponse({ status: 200, description: 'Get all drug available', type: [DrugAvailableDto]})
    @ApiResponse({ status: 400, description: 'Bad request' })
    async getAllDrugAvailable() {
        return this.drugService.getAllDrugAvailable();
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Admin, Role.Staff)
    @ApiOperation({ summary: 'Get all drug unavailable' })
    @ApiResponse({ status: 200, description: 'Get all drug unavailable', type: [DrugUnavailableDto]})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    @Get('unavailable')
    async getAllDrugUnavailable() {
        return this.drugService.getAllDrugUnavailable();
    }

    @Public()
    @Get(':id')
    @ApiOperation({ summary: 'Get drug by id' })
    @ApiParam({ name: 'id', description: 'id of drug', example: 'Batch_1' })
    @ApiResponse({ status: 200, description: 'Get drug by id', type: DrugDto})
    @ApiResponse({ status: 400, description: 'Bad request' })
    async getDrugById(@Req() req: any) {
        return this.drugService.getDrugById(req.params.id);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Admin, Role.Staff)
    @Post('add')
    @ApiOperation({ summary: 'Add drug' })
    @ApiBody({ type: DrugAvailableDto })
    @ApiResponse({ status: 200, description: 'Add drug', type: DrugAvailableDto})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    async addDrug(@Req() req: any) {
        return this.drugService.addDrug(req.body);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Admin, Role.Staff)
    @Put(':id')
    @ApiOperation({ summary: 'change status drug by id' })
    @ApiParam({ name: 'id', description: 'id of drug' , example: 'Batch_1'})
    @ApiResponse({ status: 200, description: 'Delete drug by id', type: DrugDto})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    async updateDrug(@Req() req: any) {
        return this.drugService.updateDrug(req.params.id);
    }

    @ApiBearerAuth('JWT-auth')
    @Roles(Role.Admin, Role.Staff)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete drug by id' })
    @ApiParam({ name: 'id', description: 'id of drug', example: 'Batch_1' })
    @ApiResponse({ status: 200, description: 'Delete drug by id', type: DrugDto})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token is invalid or expired' })
    @ApiResponse({ status: 403, description: 'Forbidden resource - Roll is invalid' })
    async deleteDrug(@Req() req: any) {
        return this.drugService.deleteDrug(req.params.id);
    }


}
