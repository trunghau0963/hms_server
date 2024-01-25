import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './modules/products/product.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs/configuration';
import { Patient } from './patient/entities/patient.entity';
import { PatientModule } from './patient/patient.module';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { StaffModule } from './staff/staff.module';
import { DentistModule } from './dentist/dentist.module';
import { DrugService } from './drug/drug.service';
import { DrugModule } from './drug/drug.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ScheduleService } from './schedule/schedule.service';
import { ScheduleController } from './schedule/schedule.controller';
import { ScheduleModule } from './schedule/schedule.module';
import { RecordModule } from './record/record.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    AuthModule,
    PatientModule,
    AdminModule,
    StaffModule,
    DentistModule,
    DrugModule,
    AppointmentModule,
    ScheduleModule,
    RecordModule,
  ],
  controllers: [AppController, ScheduleController],
  providers: [AppService, ScheduleService],
})
export class AppModule { }

