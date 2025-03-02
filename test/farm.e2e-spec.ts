import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Farms Endpoints (e2e)', () => {
  let app: INestApplication;
  let farmId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /*it('Should add a new farm to a producer', async () => {
    const response = await request(app.getHttpServer())
    .post('/farms')
    .send({
        name: "Fazenda Nova Piratininga",
        city: "São Miguel do Araguaia",
        state: "Goias",
        totalArea: 135000,
        arableArea: 100000,
        vegetationArea: 35000,
        producerId: "291ab590-48da-41f2-ab26-8305051f8ce2"
    })
    .expect(201);
    
    farmId = response.body.id;
    expect(response.body).toHaveProperty('id');
  });*/

  it('Should return the count of all registered farms', async () => {
    const response = await request(app.getHttpServer()).get('/farm/farms').expect(200);
  
    expect(response.body).toHaveProperty('totalFarms');
  });

  it('Should return the total count of hectares registered', async () => {
    const response = await request(app.getHttpServer()).get('/farm/hectares').expect(200);
  
    expect(response.body).toHaveProperty('totalHectares');
  });

  it('Should return the total land usage registered', async () => {
    const response = await request(app.getHttpServer()).get('/farm/landUsage').expect(200);
  
    expect(response.body).toHaveProperty('arableArea');
    expect(response.body).toHaveProperty('vegetationArea');
  });

  it('Should return the total land usage registered', async () => {
    await request(app.getHttpServer()).get('/farm/farmsByState').expect(200);
  });
});
