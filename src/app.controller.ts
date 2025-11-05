import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';

const TEST_API = 'https://test.icorp.uz/interview.php';
let firstPartCode = '';

@Controller()
export class AppController {
  @Post('api')
  async receiveCode(@Body() body: { codePart: string }) {
    console.log('Ikkinchi qism keldi:', body);

    const fullCode = firstPartCode + body.codePart;
    console.log('To‘liq kod:', fullCode);

    const getRes = await axios.get(`${TEST_API}?code=${fullCode}`);
    console.log('Yakuniy javob:', getRes.data);

    return {
      message: 'Test yakunlandi ✅',
      fullCode,
      result: getRes.data,
    };
  }
}
