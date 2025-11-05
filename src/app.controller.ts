import { Controller, Post, Body } from '@nestjs/common';

@Controller()
export class AppController {
  @Post('api')
  async receiveCode(@Body() body: { codePart: string }) {
    console.log('📨 POST keldi:', body);

    return {
      message: '✅ Server ishlayapti!',
      received: body.codePart,
    };
  }
}
