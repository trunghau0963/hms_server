import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RecordController],
  providers: [RecordService,PrismaService]
})
export class RecordModule {}
