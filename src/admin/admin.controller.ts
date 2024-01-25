import { Controller, Get, Post, Put, Req, UseGuards, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Patient } from '@prisma/client';
import { Public } from 'src/auth/auth.controller';
import { AdminService } from './admin.service';
import { changeStatus } from './dtos/admin.dtos';


@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }


    @Public()
    @Put('changestatus/:id')
    async changStatusUser(@Req() req: any, @Body() data: changeStatus): Promise<any> {
        console.log(req.params.id);
        return this.adminService.changStatusUser(req.params.id, data);
    }

}
