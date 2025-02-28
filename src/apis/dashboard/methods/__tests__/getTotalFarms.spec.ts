// Importando modulos de teste do nest
import { Test, TestingModule } from '@nestjs/testing';
// Importando Serviço de fazenda/propriedade
import { DashboardService } from '../../dashboard.service';
import { PrismaService } from '../../../../prisma/prisma.service';
// Importando controllers
import { DashboardController } from '../../dashboard.controller';

describe('Get total farms', () => {
  let service: DashboardService;
  let controller: DashboardController;
  let prismaService: PrismaService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [DashboardController],
        providers: [
            DashboardService,
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
  
      controller = module.get<DashboardController>(DashboardController);
      service = module.get<DashboardService>(DashboardService);
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
