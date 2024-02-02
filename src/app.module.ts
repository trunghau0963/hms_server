import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppointmentModule } from "./appointment/appointment.module";
import { AuthModule } from "./auth/auth.module";
import { JwtStrategy } from "./auth/strategy/jwt.strategy";
import { DrugModule } from "./drug/drug.module";
import { RecordModule } from "./record/record.module";
import { ScheduleModule } from "./schedule/schedule.module";
import { ServiceModule } from "./service/service.module";
import { UserModule } from "./user/user.module";
import { AccessControlModule, ACGuard } from "nest-access-control";
import { APP_GUARD } from "@nestjs/core";
import { RBAC_POLICY } from "./auth/rbac-policy";

@Module({
  imports: [
    AccessControlModule.forRoles(RBAC_POLICY),
    ConfigModule.forRoot({
      // load: [configuration],
      envFilePath: ".env",
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    DrugModule,
    AppointmentModule,
    ScheduleModule,
    RecordModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: ACGuard,
    },
  ],
})
export class AppModule {}
