import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get the application status' })
  @ApiResponse({ status: 200, description: 'Application is running' })
  getStatus(): string {
    return this.appService.getStatus();
  }
}
