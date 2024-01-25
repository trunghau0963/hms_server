import { Module } from '@nestjs/common';
import { DrugController } from './drug.controller';
import { DrugService } from './drug.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DrugController],
  providers: [DrugService, PrismaService]
})
export class DrugModule {}
