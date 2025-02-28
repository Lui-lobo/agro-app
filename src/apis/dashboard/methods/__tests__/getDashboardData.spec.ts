// Importando modulos de teste do nest
import { Test, TestingModule } from '@nestjs/testing';
// Importando Serviço de fazenda/propriedade
import { DashboardService } from '../../dashboard.service';
import { PrismaService } from '../../../../prisma/prisma.service';
// Importando controllers
import { DashboardController } from '../../dashboard.controller';
// Importando metodos
import getCropsDistribution from '../getCropsDistribution';
import getFarmsByState from '../getFarmsByState';
import getLandUsage from '../getLandUsage';
import getTotalFarms from '../getTotalFarms';
import getTotalHectares from '../getTotalHectares';
// Mockando metodos
jest.mock('../getCropsDistribution'); // Mock de getCropsDistribution
jest.mock('../getFarmsByState');
jest.mock('../getLandUsage');
jest.mock('../getTotalFarms');
jest.mock('../getTotalHectares');

describe('Get dashboard', () => {
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
              crop: {
                groupBy: jest.fn()
              },
              farm: {
                groupBy: jest.fn(),
                aggregate: jest.fn(),
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

  it('should return all dashboard data', async () => {
    jest.mocked(getTotalFarms).mockResolvedValue({ totalFarms: 10 });
    jest.mocked(getTotalHectares).mockResolvedValue({ totalHectares: 5000 });
    jest.mocked(getFarmsByState).mockResolvedValue([
        { state: 'SP', total: 5 },
        { state: 'MG', total: 3 },
    ]);
    jest.mocked(getCropsDistribution).mockResolvedValue([
      { crop: 'Soja', total: 7 },
      { crop: 'Milho', total: 4 },
    ]);
    jest.mocked(getLandUsage).mockResolvedValue({
        arableArea: 3000,
        vegetationArea: 2000,
    });

    const result = await service.getDashboardData();

    expect(result).toEqual({
      totalFarms: 10,
      totalHectares: 5000,
      farmsByState: [
        { state: 'SP', total: 5 },
        { state: 'MG', total: 3 },
      ],
      cropsDistribution: [
        { crop: 'Soja', total: 7 },
        { crop: 'Milho', total: 4 },
      ],
      landUsage: {
        arableArea: 3000,
        vegetationArea: 2000,
      },
    });
  });
});
