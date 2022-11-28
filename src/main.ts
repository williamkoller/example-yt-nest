import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  // enable lib class-transformer
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('PORT');

  await app.listen(port, () => logger.log(`Server listen at port: ${port}`));
}
bootstrap();
