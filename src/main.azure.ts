import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/transform.interceptor';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  //Get API configs
  const configService = app.get<ConfigService>(ConfigService);

  //Check API production status
  const isProduction =
    configService.get<string>('PRODUCTION') === 'true' ? true : false;

  //Config Swagger
  if (!isProduction) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .addBearerAuth()
        .setTitle('productO API')
        .setDescription('productO is a product details management API')
        .setVersion('1.0')
        .build(),
      { ignoreGlobalPrefix: false },
    );

    SwaggerModule.setup('docs', app, document);
  }

  // Transform respond to the standard format (APIResponse: interface)
  app.useGlobalInterceptors(new TransformInterceptor());

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
      //  whitelist: true,
    }),
  );

  //Init API
  await app.init();
  return app;
}
