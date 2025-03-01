import { Test, TestingModule } from '@nestjs/testing';
// Importando controller
import { HarvestController } from '../../harvest.controller';
// Importando serviços
import { HarvestService } from '../../harvest.service';
import { PrismaService } from '../../../../prisma/prisma.service';
// Importando DTOs
import { AddHarvestDto } from '../../../../utils/dtos/harvest/harvest.dto';
// Importando metodos
import addHarvest from '../addHarvest';
// Importando exceptions
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
// Criando mocks
jest.mock('../addHarvest'); // Mock de addHarvest

describe('add harvest', () => {
  let controller: HarvestController;
  let service: HarvestService;
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestController],
      providers: [
        HarvestService,
        {
          provide: PrismaService,
          useValue: {
            farm: {
              findUnique: jest.fn()
            },
            harvest: {
              create: jest.fn(),
            }
          },
        },
      ],
    }).compile();

    controller = module.get<HarvestController>(HarvestController);
    service = module.get<HarvestService>(HarvestService);
    prismaService = module.get<PrismaService>(PrismaService);

    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks();
  });

  afterEach(() => {
      jest.clearAllMocks();
  });
  

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ------------------- Testes de sucesso da add harvest ------------------- //
   it('should add a harvest to a farm', async () => {
      const addHarvestDto: AddHarvestDto = { year: 2021, farmId: 'af0e99ae-8b0c-4755-bbc0-eb88abb0c10e', description: 'Safra do primeiro semestre de 2021' } as AddHarvestDto;
      const expectedResult = { id: '1c5236c7-65d1-49f5-85f5-7c1081802c3f', year: 2021, farmId: 'af0e99ae-8b0c-4755-bbc0-eb88abb0c10e', description: 'Safra do primeiro semestre de 2021' }; // Resultado esperado
  
      const existingFarm = { 
          id: 'af0e99ae-8b0c-4755-bbc0-eb88abb0c10e', 
          name: 'Fazenda Nova Piratininga', 
          city: 'São Miguel do Araguaia',
          state: 'Goias',
          totalArea: 135000,
          arableArea: 100000,
          vegetationArea: 35000,
          producerId: 'd8c7f8cd-00cf-454d-aac6-7464a3c29b82'
      };
  
      // Mock para encontrar a fazenda enviada
      jest.spyOn(prismaService.farm, 'findUnique').mockResolvedValue(existingFarm);
      // Valor esperado de retorno da função de criar produtor
      jest.mocked(addHarvest).mockResolvedValue(expectedResult);
  
      const result = await controller.addHarvest(addHarvestDto);
  
      // Esperamos que createProducer tenha sido chamado com os dados de uma requisição normal
      expect(addHarvest).toHaveBeenCalledWith(prismaService, { ...addHarvestDto });
      // Resultado deve ser igual ao esperado!
      expect(result).toEqual(expectedResult);
    });

    // ------------------- Testes de exceções da add harvest ------------------- //
    it('Should throw a NotFoundException when the farm ID does not exist in the registers.', async () => {
      const addHarvestDto: AddHarvestDto = { year: 2021, farmId: 'idQueNaoExiste', description: 'Safra para fazenda que não existe' } as AddHarvestDto;
  
      // Não encontra o produtor enviado no sistema
      jest.spyOn(prismaService.farm, 'findUnique').mockResolvedValue(null);
      // Simula a rejeição da Promise com a mensagem de erro
      jest.mocked(addHarvest).mockRejectedValue(new NotFoundException('Farm not found'));
  
      // Verifica se a exceção é lançada
      await expect(service.add(addHarvestDto)).rejects.toThrow(NotFoundException);
      await expect(service.add(addHarvestDto)).rejects.toThrow('Farm not found');
    });
    
    it('should throw an NotFoundException when producerId dont exist in the registers', async () => {
      const addHarvestDto: AddHarvestDto = { year: undefined, farmId: 'af0e99ae-8b0c-4755-bbc0-eb88abb0c10e', description: 'Safra que retorna um erro fatal' } as AddHarvestDto;
      const err = 'cannot use undefined as a value';

      const existingFarm = { 
        id: 'af0e99ae-8b0c-4755-bbc0-eb88abb0c10e', 
        name: 'Fazenda Nova Piratininga', 
        city: 'São Miguel do Araguaia',
        state: 'Goias',
        totalArea: 135000,
        arableArea: 100000,
        vegetationArea: 35000,
        producerId: 'd8c7f8cd-00cf-454d-aac6-7464a3c29b82'
    };
  
      // Não encontra o produtor enviado no sistema
      jest.spyOn(prismaService.farm, 'findUnique').mockResolvedValue(existingFarm);
      // Simula a rejeição da Promise com a mensagem de erro
      jest.mocked(addHarvest).mockRejectedValue(new InternalServerErrorException(`A fatal error occured when creating harvest -> ${JSON.stringify(err)}`));
  
      // Verifica se a exceção é lançada
      await expect(service.add(addHarvestDto)).rejects.toThrow(InternalServerErrorException);
      await expect(service.add(addHarvestDto)).rejects.toThrow(`A fatal error occured when creating harvest -> ${JSON.stringify(err)}`);
    });
});
