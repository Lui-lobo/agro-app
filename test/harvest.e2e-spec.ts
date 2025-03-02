import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Harvests Endpoints (e2e)', () => {
  let app: INestApplication;
  //let harvestId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should return a farm not found error', async () => {
    await request(app.getHttpServer())
      .post('/harvests')
      .send({ year: 2024, farmId: 'farmNotFound' })
      .expect(404);
  });
});
