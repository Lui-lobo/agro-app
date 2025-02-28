// Importando modulos de teste do nest
import { Test, TestingModule } from '@nestjs/testing';
// Importando Serviço de fazenda/propriedade
import { DashboardService } from '../../dashboard.service';
import { PrismaService } from '../../../../prisma/prisma.service';
// Importando controllers
import { DashboardController } from '../../dashboard.controller';

describe('Get Land Usage', () => {
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
                aggregate: jest.fn()
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

  it('should return the total land usage', async () => {
      jest.spyOn(prismaService.farm, 'aggregate').mockResolvedValue({
        _sum: { arableArea: 3000, vegetationArea: 2000 }, _avg: null, _count: null, _max: null, _min: null,
      });
  
      const result = await service.getLandUsage();
      expect(result).toEqual({ arableArea: 3000, vegetationArea: 2000 });
  });
});
