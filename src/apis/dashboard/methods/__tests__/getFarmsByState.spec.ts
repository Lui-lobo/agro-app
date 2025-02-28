// Importando modulos de teste do nest
import { Test, TestingModule } from '@nestjs/testing';
// Importando Serviço de fazenda/propriedade
import { DashboardService } from '../../dashboard.service';
import { PrismaService } from '../../../../prisma/prisma.service';
// Importando controllers
import { DashboardController } from '../../dashboard.controller';

describe('Get farms by state', () => {
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
                groupBy: jest.fn()
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

  it('Should return the distribution of the farms by state', async () => {
    // @ts-ignore -> Comentário necessário pois ts com prisma indica dependencia circular nesse caso.
    jest.spyOn(prismaService.farm, 'groupBy').mockResolvedValue([
        { state: 'SP', _count: { id: 5 } },
        { state: 'MG', _count: { id: 3 } },
      ]);
  
      const result = await service.getFarmsByState();
      expect(result).toEqual([
        { state: 'SP', total: 5 },
        { state: 'MG', total: 3 },
      ]);
  });

  it('Should return a empty distribution of the farms by state', async () => {
    jest.spyOn(prismaService.farm, 'groupBy').mockResolvedValue([]);
  
    const result = await service.getFarmsByState();

    expect(result).toEqual([]);
  });
});
