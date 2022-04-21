import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get()
  async getHelloFromApi(): Promise<{ message: string }> {
    return {
      message: 'hello from api',
    };
  }
}
