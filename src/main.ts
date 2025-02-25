import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades desconhecidas automaticamente
      forbidNonWhitelisted: true, // Retorna erro se propriedades não reconhecidas forem enviadas
      transform: true, // Transforma os dados de entrada conforme os tipos do DTO
    }),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Produtores Rurais')
    .setDescription('Documentação da API para gerenciar produtores rurais')
    .setVersion('1.0')
    .addTag('producers')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // O Swagger ficará disponível em /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
