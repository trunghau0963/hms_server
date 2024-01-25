import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { AuthGuard } from '@nestjs/passport';
import { Dentist, Patient, Staff } from '@prisma/client';
import { Public } from 'src/auth/auth.controller';

@ApiTags('Staff')
@Controller('staff')
export class StaffController {
    constructor(private readonly staffService: StaffService) { }

    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @Public()
    @Get()
    async getAllStaff(@Req() req: any) : Promise<Staff[]> {
        return this.staffService.getAllStaff();
    }

    @Public()
    @Get(':id')
    async getStaffById(@Req() req: any) : Promise<Staff> {
        return this.staffService.getStaffById(req.params.id);
    }

}
