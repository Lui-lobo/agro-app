// Importando modulos de teste do nest
import { Test, TestingModule } from '@nestjs/testing';
// Importando Serviço de fazenda/propriedade
import { FarmService } from '../../farm.service';
import { PrismaService } from '../../../../prisma/prisma.service';
// Importando controllers
import { FarmController } from '../../farm.controller';
// Importando metodos
import addFarm from '../addFarm';
// Importando DTOs
import { AddFarmDto } from '../../../../utils/dtos/farms/farms.dto';
// Importando exceções
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
// Criando mocks
jest.mock('../addFarm'); // Mock de addFarm

describe('add farm', () => {
  let service: FarmService;
  let controller: FarmController;
  let prismaService: PrismaService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [FarmController],
        providers: [
          FarmService,
          {
            provide: PrismaService,
            useValue: {
              producer: {
                findUnique: jest.fn()
              },
              farm: {
                create: jest.fn(),
              }
            },
          },
        ],
      }).compile();
  
      controller = module.get<FarmController>(FarmController);
      service = module.get<FarmService>(FarmService);
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

 // ------------------- Testes de sucesso da add farm ------------------- //
 it('should add a farm to a producer', async () => {
    const addFarmDto: AddFarmDto = { name: 'Fazenda Nova Piratininga', city: 'São Miguel do Araguaia', state: 'Goias', totalArea: 135000,  arableArea: 100000, vegetationArea: 35000, producerId: 'd8c7f8cd-00cf-454d-aac6-7464a3c29b82' } as AddFarmDto; // Dados de teste com CPF
    const expectedResult = { id: 'af0e99ae-8b0c-4755-bbc0-eb88abb0c10e', name: 'Fazenda Nova Piratininga', city: 'São Miguel do Araguaia', state: 'Goias', totalArea: 135000,  arableArea: 100000, vegetationArea: 35000, producerId: 'd8c7f8cd-00cf-454d-aac6-7464a3c29b82' }; // Resultado esperado

    const existingProducer = { 
        id: 'd8c7f8cd-00cf-454d-aac6-7464a3c29b82', 
        name: 'Luiz Henrique Agricultor', 
        cpf: 'ryYoEcwrXVLWR+Fhe4iRkw==',
        cnpj: null,
        createdAt: new Date()
    };

    // Mock para encontrar o produtor enviado
    jest.spyOn(prismaService.producer, 'findUnique').mockResolvedValue(existingProducer);
    // Valor esperado de retorno da função de criar produtor
    jest.mocked(addFarm).mockResolvedValue(expectedResult);

    const result = await controller.addFarm(addFarmDto);

    // Esperamos que createProducer tenha sido chamado com os dados de uma requisição normal
    expect(addFarm).toHaveBeenCalledWith(prismaService, { ...addFarmDto });
    // Resultado deve ser igual ao esperado!
    expect(result).toEqual(expectedResult);
  });

  // ------------------- Testes de exceções da add farm ------------------- //
  it('should throw an NotFoundException when producerId dont exist in the registers', async () => {
    const addFarmDto: AddFarmDto = { name: 'Fazenda Nova Piratininga', city: 'São Miguel do Araguaia', state: 'Goias', totalArea: 135000,  arableArea: 100000, vegetationArea: 35000, producerId: 'produtorQueNaoExiste' } as AddFarmDto; // Dados de teste com CPF

    // Não encontra o produtor enviado no sistema
    jest.spyOn(prismaService.producer, 'findUnique').mockResolvedValue(null);
    // Simula a rejeição da Promise com a mensagem de erro
    jest.mocked(addFarm).mockRejectedValue(new NotFoundException('Producer not found'));

    // Verifica se a exceção é lançada
    await expect(service.addFarm(addFarmDto)).rejects.toThrow(NotFoundException);
    await expect(service.addFarm(addFarmDto)).rejects.toThrow('Producer not found');
  });

  it('should throw a BadRequestException when the sum of arable and vegetation areas exceed the total area!', async () => {
    const addFarmDto: AddFarmDto = { name: 'Fazenda Nova Piratininga', city: 'São Miguel do Araguaia', state: 'Goias', totalArea: 135000,  arableArea: 100000, vegetationArea: 50000, producerId: 'd8c7f8cd-00cf-454d-aac6-7464a3c29b82' } as AddFarmDto; // Dados de teste com CPF

    const existingProducer = { 
        id: 'd8c7f8cd-00cf-454d-aac6-7464a3c29b82', 
        name: 'Luiz Henrique Agricultor', 
        cpf: 'ryYoEcwrXVLWR+Fhe4iRkw==',
        cnpj: null,
        createdAt: new Date()
    };

    // Não encontra o produtor enviado no sistema
    jest.spyOn(prismaService.producer, 'findUnique').mockResolvedValue(existingProducer);
    // Simula a rejeição da Promise com a mensagem de erro
    jest.mocked(addFarm).mockRejectedValue(new BadRequestException('The sum of arable and vegetation areas cannot exceed the total area'));

    // Verifica se a exceção é lançada
    await expect(service.addFarm(addFarmDto)).rejects.toThrow(BadRequestException);
    await expect(service.addFarm(addFarmDto)).rejects.toThrow('The sum of arable and vegetation areas cannot exceed the total area');
  });

  it('Should throw an InternalServerErrorException when a fatal error occurs while adding a farm to a producer!', async () => {
    const addFarmDto: AddFarmDto = { name: 'Fazenda Nova Piratininga', city: 'São Miguel do Araguaia', state: 'Goias', totalArea: 135000,  arableArea: 100000, vegetationArea: 35000, producerId: 'd8c7f8cd-00cf-454d-aac6-7464a3c29b82' } as AddFarmDto; // Dados de teste com CPF

    const existingProducer = { 
        id: 'd8c7f8cd-00cf-454d-aac6-7464a3c29b82', 
        name: 'Luiz Henrique Agricultor', 
        cpf: 'ryYoEcwrXVLWR+Fhe4iRkw==',
        cnpj: null,
        createdAt: new Date()
    };

    // Não encontra o produtor enviado no sistema
    jest.spyOn(prismaService.producer, 'findUnique').mockResolvedValue(existingProducer);
    // Simula a rejeição da Promise com a mensagem de erro
    jest.mocked(addFarm).mockRejectedValue(new InternalServerErrorException('Fatal error when adding new farm'));

    // Verifica se a exceção é lançada
    await expect(service.addFarm(addFarmDto)).rejects.toThrow(InternalServerErrorException);
    await expect(service.addFarm(addFarmDto)).rejects.toThrow('Fatal error when adding new farm');
  });
});
