import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

const TEST_API = 'https://test.icorp.uz/interview.php';
let firstPartCode = '';

@ApiTags('Test API') // 👈 Swagger’da “Test API” deb chiqadi
@Controller()
export class AppController {
  @Post('api')
  @ApiBody({
    description: 'Test server yuboradigan ikkinchi kod qismi',
    schema: {
      type: 'object',
      properties: {
        codePart: { type: 'string', example: 'xyz123' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Test yakunlandi',
    schema: {
      example: {
        message: 'Test yakunlandi ✅',
        fullCode: 'abc123xyz123',
        result: 'Tabriklaymiz! Siz testni bajardingiz ✅',
      },
    },
  })
  async receiveCode(@Body() body: { codePart: string }) {
    console.log('📨 Ikkinchi qism keldi:', body);

    const fullCode = firstPartCode + body.codePart;
    console.log('🔑 To‘liq kod:', fullCode);

    const getRes = await axios.get(`${TEST_API}?code=${fullCode}`);
    console.log('✅ Yakuniy javob:', getRes.data);

    return {
      message: 'Test yakunlandi ✅',
      fullCode,
      result: getRes.data,
    };
  }
}
