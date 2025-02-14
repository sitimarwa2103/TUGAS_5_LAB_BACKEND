import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*', // Izinkan akses dari semua domain
    methods: ['GET', 'POST'], // Izinkan metode HTTP tertentu
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Belajar NestJS Citimarwaa')
    .setDescription(
      'Belajar NestJS adalah tutorial yang dibangun menggunakan framework NestJS',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory); // untuk 'utama' itu adalah path atau jalur atau lokasi file atai directory

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
