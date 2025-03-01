import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Producer Endpoints (e2e)', () => {
  let app: INestApplication;
  let producerId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should create a new producer', async () => {
    const response = await request(app.getHttpServer())
      .post('/producers/create')
      .send({ name: 'Produtor Teste', cpf: '12345678902' })
      .expect(201);
    
    producerId = response.body.id;
    expect(response.body).toHaveProperty('id');
  });

  it('Should update a producer', async () => {
    const response = await request(app.getHttpServer())
      .put('/producers/update')
      .send({ name: 'João Artur', cpf: '12345678902', id: producerId })
      .expect(200);
    
    producerId = response.body.id;
    expect(response.body).toHaveProperty('id');
  });

  it('Should delete a producer', async () => {
    await request(app.getHttpServer()).delete(`/producers/delete/?producerId=${producerId}`).expect(200);
  });
});
