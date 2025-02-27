// Importando modulos de teste do nest
import { Test, TestingModule } from '@nestjs/testing';
// Importando Serviço de fazenda/propriedade
import { CropService } from '../../crop.service';
import { PrismaService } from '../../../../prisma/prisma.service';
// Importando controllers
import { CropController } from '../../crop.controller';
// Importando metodos
import addCrop from '../addCrop';
// Importando DTOs
import { AddCropDto } from '../../../../utils/dtos/crop/crop.dto';
// Importando exceções
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
// Criando mocks
jest.mock('../addCrop'); // Mock de addCrop

describe('add farm', () => {
  let service: CropService;
  let controller: CropController;
  let prismaService: PrismaService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [CropController],
        providers: [
            CropService,
          {
            provide: PrismaService,
            useValue: {
              harvest: {
                findUnique: jest.fn()
              },
              crop: {
                create: jest.fn(),
              }
            },
          },
        ],
      }).compile();
  
      controller = module.get<CropController>(CropController);
      service = module.get<CropService>(CropService);
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

    // ------------------- Testes de sucesso da add harvest ------------------- //
    it('should add a crop to a harvest', async () => {
       const addCropDto: AddCropDto = { name: 'Milho', harvestId: '805c572a-c47c-45b2-8654-6a5eb1fb5798' } as AddCropDto;
       const expectedResult = { id: 'b1706eeb-5691-495a-ae34-fb123e752c0d', name: 'Milho', harvestId: '805c572a-c47c-45b2-8654-6a5eb1fb5798'  }; // Resultado esperado
 
       const existingHarvest = { 
           id: '805c572a-c47c-45b2-8654-6a5eb1fb5798', 
           year: 2022,
           farmId: 'af0e99ae-8b0c-4755-bbc0-eb88abb0c10e'
       };
 
       // Mock para encontrar a fazenda enviada
       jest.spyOn(prismaService.harvest, 'findUnique').mockResolvedValue(existingHarvest);
       // Valor esperado de retorno da função de criar produtor
       jest.mocked(addCrop).mockResolvedValue(expectedResult);
 
       const result = await controller.addCrop(addCropDto);
 
       // Esperamos que createProducer tenha sido chamado com os dados de uma requisição normal
       expect(addCrop).toHaveBeenCalledWith(prismaService, { ...addCropDto });
       // Resultado deve ser igual ao esperado!
       expect(result).toEqual(expectedResult);
    });

    // ------------------- Testes de exceções da add harvest ------------------- //
    it('Should throw a NotFoundException when the harvest ID does not exist in the registers.', async () => {
      const addCropDto: AddCropDto = { name: 'Milho', harvestId: 'idQueNaoExiste' } as AddCropDto;
    
      // Não encontra o produtor enviado no sistema
      jest.spyOn(prismaService.harvest, 'findUnique').mockResolvedValue(null);
      // Simula a rejeição da Promise com a mensagem de erro
      jest.mocked(addCrop).mockRejectedValue(new NotFoundException('Harvest not found'));
    
      // Verifica se a exceção é lançada
      await expect(service.addCrop(addCropDto)).rejects.toThrow(NotFoundException);
      await expect(service.addCrop(addCropDto)).rejects.toThrow('Harvest not found');
    });

    it('should throw an NotFoundException when producerId dont exist in the registers', async () => {
      const addCropDto: AddCropDto = { name: undefined, harvestId: '805c572a-c47c-45b2-8654-6a5eb1fb5798' } as AddCropDto;
      const err = 'cannot use undefined as a value';

      const existingHarvest = { 
        id: '805c572a-c47c-45b2-8654-6a5eb1fb5798', 
        year: 2022,
        farmId: 'af0e99ae-8b0c-4755-bbc0-eb88abb0c10e'
      };

      // Não encontra o produtor enviado no sistema
      jest.spyOn(prismaService.harvest, 'findUnique').mockResolvedValue(existingHarvest);
      // Simula a rejeição da Promise com a mensagem de erro
      jest.mocked(addCrop).mockRejectedValue(new InternalServerErrorException(`A fatal error occured when creating harvest -> ${JSON.stringify(err)}`));
    
      // Verifica se a exceção é lançada
      await expect(service.addCrop(addCropDto)).rejects.toThrow(InternalServerErrorException);
      await expect(service.addCrop(addCropDto)).rejects.toThrow(`A fatal error occured when creating harvest -> ${JSON.stringify(err)}`);
    });
});
