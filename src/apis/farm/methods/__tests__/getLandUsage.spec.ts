// Importando modulos de teste do nest
import { Test, TestingModule } from '@nestjs/testing';
// Importando Serviço de fazenda/propriedade
//import { DashboardService } from '../../dashboard.service';
import { FarmService } from '../../farm.service';
import { PrismaService } from '../../../../prisma/prisma.service';
// Importando controllers
import { FarmController } from '../../farm.controller';

describe('Get Land Usage', () => {
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

  it('should return the total land usage', async () => {
      jest.spyOn(prismaService.farm, 'aggregate').mockResolvedValue({
        _sum: { arableArea: 3000, vegetationArea: 2000 }, _avg: null, _count: null, _max: null, _min: null,
      });
  
      const result = await service.getLandUsage();
      expect(result).toEqual({ arableArea: 3000, vegetationArea: 2000 });
  });
});
