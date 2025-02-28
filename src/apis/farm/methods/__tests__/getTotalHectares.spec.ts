// Importando modulos de teste do nest
import { Test, TestingModule } from '@nestjs/testing';
// Importando Serviço de fazenda/propriedade
import { FarmService } from '../../farm.service';
import { PrismaService } from '../../../../prisma/prisma.service';
// Importando controllers
import { FarmController } from '../../farm.controller';

describe('Get total hectares', () => {
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
              farm: {
                aggregate: jest.fn()
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

  it('should return the total registered hectares', async () => {
      jest.spyOn(prismaService.farm, 'aggregate').mockResolvedValue({
        _sum: { totalArea: 5000 }, _count: null, _avg: null, _max: null, _min: null,
      });
  
      const result = await service.getTotalHectares();
      expect(result).toEqual({ totalHectares: 5000 });
  });

  it('should return the total registered hectares', async () => {
    jest.spyOn(prismaService.farm, 'aggregate').mockResolvedValue({
      _sum: { totalArea: 0 }, _count: null, _avg: null, _max: null, _min: null,
    });

    const result = await service.getTotalHectares();
    expect(result).toEqual({ totalHectares: 0 });
});
});
