import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [StaffController],
  providers: [StaffService,PrismaService]
})
export class StaffModule {}
