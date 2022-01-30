import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { TransformInterceptor } from './common/transform.interceptor';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  // Transform respond to the standard format (APIResponse: interface)
  app.useGlobalInterceptors(new TransformInterceptor());
  // Transform errors to the standard format (APIResponse: interface)
  app.useGlobalFilters(new HttpExceptionFilter());

  //Cors
  app.enableCors();

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  // Enable class validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');

  //Init API
  await app.init();
  return app;
}
