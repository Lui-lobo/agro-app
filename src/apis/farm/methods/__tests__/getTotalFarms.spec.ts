// Importando modulos de teste do nest
import { Test, TestingModule } from '@nestjs/testing';
// Importando Serviço de fazenda/propriedade
import { FarmService } from '../../farm.service';
import { PrismaService } from '../../../../prisma/prisma.service';
// Importando controllers
import { FarmController } from '../../farm.controller';

describe('Get total farms', () => {
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
                count: jest.fn()
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

  it('Should return the total number of farms registered', async () => {
    jest.spyOn(prismaService.farm, 'count').mockResolvedValue(10);

    const result = await service.getTotalFarms();
    expect(result).toEqual({ totalFarms: 10 });
  });

  it('Should return the total number of farms registered', async () => {
    jest.spyOn(prismaService.farm, 'count').mockResolvedValue(0);

    const result = await service.getTotalFarms();
    expect(result).toEqual({ totalFarms: 0 });
  });
});
