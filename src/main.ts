import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:
      process.env.APP_ENV === 'production'
        ? process.env.CLIENT_URL
        : 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(3333);
  console.log('🚀 Initialized server');
}
bootstrap();
