import { Controller, Get } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get()
  getHome() {
    return {
      message: '🚀 PingPong API is running successfully',
      docs: '/api',
    };
  }
}
