import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Crops Endpoints (e2e)', () => {
  let app: INestApplication;
  //let cropId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should return a harvest not found error', async () => {
    await request(app.getHttpServer())
      .post('/crop/add')
      .send({ name: 'Milho', harvestId: 'harvestNotFound' })
      .expect(404);
  });

  it('Should return the crop distribution based on the registers', async () => {
    await request(app.getHttpServer())
      .get('/crop/cropsDistribution')
      .send()
      .expect(200);
  });
});
