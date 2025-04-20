import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv"
import { ValidationPipe } from '@nestjs/common';
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  const port = process.env.PORT || 4004
  await app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`, "\n\n", Date.now(), "\n\n");
  });

}
bootstrap();
