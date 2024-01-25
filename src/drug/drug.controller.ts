import { Controller, Get, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DrugService } from './drug.service';
import { Public } from 'src/auth/auth.controller';

@ApiTags('Drug')
@Controller('drug')
export class DrugController {
    constructor(private readonly drugService: DrugService) { }

    @Public()
    @Get()
    async getAllDrug() {
        return this.drugService.getAllDrug();
    }

    @Public()
    @Get('available')
    async getAllDrugAvailable() {
        return this.drugService.getAllDrugAvailable();
    }

    @Public()
    @Get('unavailable')
    async getAllDrugUnavailable() {
        return this.drugService.getAllDrugUnavailable();
    }

    @Public()
    @Get(':id')
    async getDrugById(@Req() req: any) {
        return this.drugService.getDrugById(req.params.id);
    }

    @Public()
    @Put('delete-drug/:id')
    async deleteDrug(@Req() req: any) {
        return this.drugService.deleteDrug(req.params.id);
    }
}
