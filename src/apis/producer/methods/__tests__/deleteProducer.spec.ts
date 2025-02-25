import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common'; // Importando a exceção
// Importando serviços a serem testados
import { ProducerService } from '../../producer.service';
import { PrismaService } from '../../../../prisma/prisma.service';
// Importando controllers
import { ProducerController } from '../../producer.controller';
// Importando metodo de criação de produtor
import deleteProducer from '../deleteProducer';
// Importando DTO de criação de produtor
import { DeleteProducerDto } from 'src/utils/dtos/producer/producer.dto';
// Criando Mocks
jest.mock('../deleteProducer'); // Mock de createProducer

describe('Producer Service', () => {
  let controller: ProducerController;
  let service: ProducerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerController],
      providers: [
        ProducerService,
        {
          provide: PrismaService,
          useValue: {
            producer: {
              deleteProducer: jest.fn(),
              findUnique: jest.fn(),
              count: jest.fn()
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ProducerController>(ProducerController);
    service = module.get<ProducerService>(ProducerService);
    prismaService = module.get<PrismaService>(PrismaService);

    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

   // ------------------- Testes de sucesso da delete producer ------------------- //
   it('should delete a producer by his identifier', async () => {
        const deleteProducerDto: DeleteProducerDto = { producerId: "219de228-e9ef-48d9-908b-062cf9ed1a8a" } as DeleteProducerDto;
        const expectedResult = { name: 'Henrique Dos Santos', cpf: '+nesjHHZ3dRIDYsrmx2Bzw==', id: '219de228-e9ef-48d9-908b-062cf9ed1a8a', cnpj: null, createdAt: new Date() }; // Resultado esperado

        const existingProducer = { 
            id: '219de228-e9ef-48d9-908b-062cf9ed1a8a', 
            name: 'Henrique Dos Santos', 
            cpf: '+nesjHHZ3dRIDYsrmx2Bzw==',
            cnpj: null,
            createdAt: new Date()
        };

        // Mock para encontrar o produtor enviado
        jest.spyOn(prismaService.producer, 'findUnique').mockResolvedValue(existingProducer);
        // Valor esperado de retorno da função de criar produtor
        jest.mocked(deleteProducer).mockResolvedValue(expectedResult);

        const result = await controller.deleteProducer(deleteProducerDto);

        // Esperamos que createProducer tenha sido chamado com os dados de uma requisição normal
        expect(deleteProducer).toHaveBeenCalledWith(prismaService, deleteProducerDto.producerId);

        // Resultado deve ser igual ao esperado!
        expect(result).toEqual(expectedResult);
  });

  it('should throw an NotFoundException because the identifier sent dont exist!', async () => {
        const deleteProducerDto: DeleteProducerDto = {  producerId: 'IdQueNaoExiste' } as DeleteProducerDto;

        // Mock para não encontrar o produtor enviado
        jest.spyOn(prismaService.producer, 'findUnique').mockResolvedValue(null);
        // Mock para verificar se o CPF já existe em outro produtor
        jest.spyOn(prismaService.producer, 'count').mockResolvedValue(0);
        // Simula a rejeição da Promise com a mensagem de erro
        jest.mocked(deleteProducer).mockRejectedValue(new NotFoundException(`Producer with id ${deleteProducerDto.producerId} not found`));

        // Verifica se a exceção é lançada
        await expect(service.delete(deleteProducerDto.producerId)).rejects.toThrow(NotFoundException);
        await expect(service.delete(deleteProducerDto.producerId)).rejects.toThrow(`Producer with id ${deleteProducerDto.producerId} not found`);
   });

   it('should throw an NotFoundException because the identifier sent dont exist!', async () => {
        const deleteProducerDto: DeleteProducerDto = {  producerId: '12aacb56-65f5-4ed5-99c1-a161533c082b' } as DeleteProducerDto;

        const existingProducer = { 
            id: '219de228-e9ef-48d9-908b-062cf9ed1a8a', 
            name: 'Henrique Dos Santos', 
            cpf: '+nesjHHZ3dRIDYsrmx2Bzw==',
            cnpj: null,
            createdAt: new Date()
        };

        // Mock para não encontrar o produtor enviado
        jest.spyOn(prismaService.producer, 'findUnique').mockResolvedValue(existingProducer);
        // Mock para verificar se o CPF já existe em outro produtor
        jest.spyOn(prismaService.producer, 'count').mockResolvedValue(2);
        // Simula a rejeição da Promise com a mensagem de erro
        jest.mocked(deleteProducer).mockRejectedValue(new ConflictException(`Cannot delete producer with id ${deleteProducerDto.producerId} because there are associated farms/properties.`));

        // Verifica se a exceção é lançada
        await expect(service.delete(deleteProducerDto.producerId)).rejects.toThrow(ConflictException);
        await expect(service.delete(deleteProducerDto.producerId)).rejects.toThrow(`Cannot delete producer with id ${deleteProducerDto.producerId} because there are associated farms/properties.`);
    });
});