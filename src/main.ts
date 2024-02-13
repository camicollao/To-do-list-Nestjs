import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //elimina los campos añadidos de mas
      forbidNonWhitelisted: true, // manda un error en caso de que se manden campos innecesarios
      transform: true //transforma a instancias de clase
    })
  );
  await app.listen(3000);
}
bootstrap();
