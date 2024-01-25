import { Module } from '@nestjs/common';
import { DentistController } from './dentist.controller';
import { DentistService } from './dentist.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DentistController],
  providers: [DentistService, PrismaService]
})
export class DentistModule {}
