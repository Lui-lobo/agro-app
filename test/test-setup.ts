import * as dotenv from 'dotenv';
import { execSync } from 'child_process';

// Garante que o Jest carregue o ambiente de testes
dotenv.config({ path: '.env.test' });

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

let app: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  await app.init();

  // Limpa o banco de dados antes de rodar os testes
  const prisma = app.get(PrismaService);
  await prisma.$executeRaw`TRUNCATE TABLE "Producer", "Farm", "Harvest" CASCADE`;
});

afterAll(async () => {
  await app.close();
});

export { app };
