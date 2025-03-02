import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // อนุญาตให้ Frontend เรียก API ได้
  app.enableCors({
    origin: "http://localhost:3001", // อนุญาตเฉพาะ Frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // ถ้าใช้ cookies หรือ headers ที่ต้องมี credentials
  });

  await app.listen(3000);
}
bootstrap();
