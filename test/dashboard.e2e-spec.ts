import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Dashboard Endpoints (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should return the dashboard route data', async () => {
    const response = await request(app.getHttpServer()).get('/dashboard').expect(200);
    
    expect(response.body).toHaveProperty('totalFarms');
    expect(response.body).toHaveProperty('totalHectares');
    expect(response.body).toHaveProperty('farmsByState');
    expect(response.body).toHaveProperty('cropsDistribution');
    expect(response.body).toHaveProperty('landUsage');
  });
});
