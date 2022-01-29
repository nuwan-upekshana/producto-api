import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { TransformInterceptor } from './common/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const isProduction =
    configService.get<string>('PRODUCTION') === 'true' ? true : false;

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

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.enableCors();

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
