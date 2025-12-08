import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // autorise Vite
    credentials: true,              // si tu envoies cookies ou headers auth
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
