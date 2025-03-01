import { Test, TestingModule } from '@nestjs/testing';
// Importando Controller
import { FarmController } from './farm.controller';
// Importando serviços
import { FarmService } from './farm.service';
// Importando DTOs
import { AddFarmDto } from 'src/utils/dtos/farms/farms.dto';

describe('FarmController', () => {
  let controller: FarmController;
  let service: FarmService;

  const mockDashboardService = {
    addFarm: jest.fn().mockImplementation((dto: AddFarmDto) => {
      return Promise.resolve(dto);
    }),
    getFarmsByState: jest.fn().mockImplementation(() => {
      return Promise.resolve([
        {
            "state": "Goias",
            "total": 1
        }
    ])
    }),
    getLandUsage: jest.fn().mockImplementation(() => {
      return Promise.resolve(
        {
          "arableArea": 100000,
          "vegetationArea": 35000
        }
      )
    }),
    getTotalFarms: jest.fn().mockImplementation(() => {
      return Promise.resolve(
        {
          "totalFarms": 1
        }
      )
    }),
    getTotalHectares: jest.fn().mockImplementation(() => {
      return Promise.resolve(
        {
          "totalHectares": 135000
        }
      )
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmController],
      providers: [{ provide: FarmService, useValue: mockDashboardService }],
    }).compile();

    controller = module.get<FarmController>(FarmController);
    service = module.get<FarmService>(FarmService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a new farm', async () => {
    const farmDto: AddFarmDto = { 
      name: "Fazenda Nova Piratininga",
      city: "São Miguel do Araguaia",
      state: "Goias",
      totalArea: 135000,
      arableArea: 100000,
      vegetationArea: 35000,
      producerId: "291ab590-48da-41f2-ab26-8305051f8ce2" 
    } as AddFarmDto;

    const result = await controller.addFarm(farmDto);

    expect(result).toEqual({
      name: "Fazenda Nova Piratininga",
      city: "São Miguel do Araguaia",
      state: "Goias",
      totalArea: 135000,
      arableArea: 100000,
      vegetationArea: 35000,
      producerId: "291ab590-48da-41f2-ab26-8305051f8ce2" 
    });
    expect(service.addFarm).toHaveBeenCalledWith(farmDto);
    expect(service.addFarm).toHaveBeenCalledTimes(1);
  });

  it('should get the total number of registered farms', async () => {
    const expectedResult = {
      "totalFarms": 1
    }

    const result = await controller.getTotalFarms();

    expect(result).toEqual(expectedResult);
    expect(service.getTotalFarms).toHaveBeenCalledWith();
    expect(service.getTotalFarms).toHaveBeenCalledTimes(1);
  });

  it('should get the numbers of farms by state', async () => {
    const expectedResult = [
      {
        state: "Goias",
        total: 1
      }
    ]

    const result = await controller.getFarmsByState();

    expect(result).toEqual(expectedResult);
    expect(service.getFarmsByState).toHaveBeenCalledWith();
    expect(service.getFarmsByState).toHaveBeenCalledTimes(1);
  });

  it('should get the total sum of registered hectares', async () => {
    const expectedResult = {
      totalHectares: 135000
    }

    const result = await controller.getTotalHectares();

    expect(result).toEqual(expectedResult);
    expect(service.getTotalHectares).toHaveBeenCalledWith();
    expect(service.getTotalHectares).toHaveBeenCalledTimes(1);
  });

  it('should get the total number of land usage', async () => {
    const expectedResult =  {
      "arableArea": 100000,
      "vegetationArea": 35000
    }

    const result = await controller.getLandUsage();

    expect(result).toEqual(expectedResult);
    expect(service.getLandUsage).toHaveBeenCalledWith();
    expect(service.getLandUsage).toHaveBeenCalledTimes(1);
  });
});
