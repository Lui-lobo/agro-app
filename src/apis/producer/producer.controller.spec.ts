import { Test, TestingModule } from '@nestjs/testing';
// Importando controller
import { ProducerController } from './producer.controller';
// Importando service
import { ProducerService } from './producer.service';
// Importando DTOs
import { CreateProducerDto, DeleteProducerDto, UpdateProducerDto } from 'src/utils/dtos/producer/producer.dto';

describe('ProducerController', () => {
  let controller: ProducerController;
  let service: ProducerService;

  const mockProducerService = {
    create: jest.fn().mockImplementation(() => {
      return Promise.resolve({
        "id": "219de228-e9ef-48d9-908b-062cf9ed1a8a",
        "name": "Henrique Dos Santos",
        "cpf": "kAvYXLySL9xapgQ9ufkJBg==",
        "createdAt": "2025-03-01T11:52:49.921Z",
        "cnpj": null
      });
    }),
    update: jest.fn().mockImplementation(() => {
      return Promise.resolve({
        "id": "219de228-e9ef-48d9-908b-062cf9ed1a8a",
        "name": "Henrique novo 3",
        "cnpj": "SW88JA6E9ywN3mBgYJ5wFQ==",
        "createdAt": "2025-03-01T11:52:49.921Z",
        "cpf": null
      });
    }),
    delete: jest.fn().mockImplementation(() => {
      return Promise.resolve({
        "id": "52f06fe8-4e24-4fcd-8bdf-da84160354a9",
        "name": "João paulo",
        "cnpj": "SW88JA6E9ywN3mBgYJ5wFQ==",
        "createdAt": "2025-03-01T11:52:49.921Z",
        "cpf": null
      });
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerController],
      providers: [{ provide: ProducerService, useValue: mockProducerService }],
    }).compile();

    controller = module.get<ProducerController>(ProducerController);
    service = module.get<ProducerService>(ProducerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a new producer', async () => {
    const createProducerDto: CreateProducerDto = { 
      name: "Henrique Agricultor 3",
      cpf: "47581399892"
    } as CreateProducerDto;

    const result = await controller.create(createProducerDto);

    expect(result).toEqual({
      "id": "219de228-e9ef-48d9-908b-062cf9ed1a8a",
      "name": "Henrique Dos Santos",
      "cpf": "kAvYXLySL9xapgQ9ufkJBg==",
      "createdAt": "2025-03-01T11:52:49.921Z",
      "cnpj": null
    });
    expect(service.create).toHaveBeenCalledWith(createProducerDto);
    expect(service.create).toHaveBeenCalledTimes(1);
  });

  it('should update a producer', async () => {
    const updateProducerDto: UpdateProducerDto = {
        "id": "52f06fe8-4e24-4fcd-8bdf-da84160354a9",
        "name": "Henrique novo 3",
        "cnpj": "00000000000001"
    } as UpdateProducerDto;

    const result = await controller.update(updateProducerDto);

    expect(result).toEqual({
      "id": "219de228-e9ef-48d9-908b-062cf9ed1a8a",
      "name": "Henrique novo 3",
      "cnpj": "SW88JA6E9ywN3mBgYJ5wFQ==",
      "createdAt": "2025-03-01T11:52:49.921Z",
      "cpf": null
    });
    expect(service.update).toHaveBeenCalledWith(updateProducerDto);
    expect(service.update).toHaveBeenCalledTimes(1);
  });

  it('should delete a producer', async () => {
    const deleteProducerDto: DeleteProducerDto = {
        "producerId": "52f06fe8-4e24-4fcd-8bdf-da84160354a9"
    } as DeleteProducerDto;

    const producerId: String = "52f06fe8-4e24-4fcd-8bdf-da84160354a9";

    const result = await controller.deleteProducer(deleteProducerDto);

    expect(result).toEqual({
      "id": "52f06fe8-4e24-4fcd-8bdf-da84160354a9",
      "name": "João paulo",
      "cnpj": "SW88JA6E9ywN3mBgYJ5wFQ==",
      "createdAt": "2025-03-01T11:52:49.921Z",
      "cpf": null
    });
    expect(service.delete).toHaveBeenCalledWith(producerId);
    expect(service.delete).toHaveBeenCalledTimes(1);
  });
});
