import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/hms')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
