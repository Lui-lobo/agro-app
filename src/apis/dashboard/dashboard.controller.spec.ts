import { Test, TestingModule } from '@nestjs/testing';
// Importando controller
import { DashboardController } from './dashboard.controller';
// Importando serviço
import { DashboardService } from './dashboard.service';

describe('DashboardController', () => {
  let controller: DashboardController;
  let service: DashboardService;

  // Mockando o serviço de dashboard
  const mockDashboardService = {
      getDashboardData: jest.fn().mockImplementation(() => {
        return Promise.resolve({
            totalFarms: 1,
            totalHectares: 135000,
            farmsByState: [
                {
                    state: "Goias",
                    total: 1
                }
            ],
            cropsDistribution: [
                {
                    crop: "Milho",
                    total: 1
                }
            ],
            landUsage: {
                arableArea: 100000,
                vegetationArea: 35000
            }
        });
      })
    };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [{ provide: DashboardService, useValue: mockDashboardService }],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  it('should get the dashboard data', async () => {
      const expectedResult = {
        totalFarms: 1,
        totalHectares: 135000,
        farmsByState: [
            {
                state: "Goias",
                total: 1
            }
        ],
        cropsDistribution: [
            {
                crop: "Milho",
                total: 1
            }
        ],
        landUsage: {
            arableArea: 100000,
            vegetationArea: 35000
        }
      }

      const result = await controller.getDashboard();
  
      expect(result).toEqual(expectedResult);
      expect(service.getDashboardData).toHaveBeenCalledWith();
      expect(service.getDashboardData).toHaveBeenCalledTimes(1);
    });
});
