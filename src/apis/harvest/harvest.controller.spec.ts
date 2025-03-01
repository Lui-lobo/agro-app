import { Test, TestingModule } from '@nestjs/testing';
// Importando controller
import { HarvestController } from './harvest.controller';
// Importando services
import { HarvestService } from './harvest.service';
// Importando DTO
import { AddHarvestDto } from 'src/utils/dtos/harvest/harvest.dto';

describe('HarvestController', () => {
  let controller: HarvestController;
  let service: HarvestService;

  const mockHarvestService = {
    add: jest.fn().mockImplementation((dto: AddHarvestDto) => {
      return Promise.resolve(dto);
    })
  };
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestController],
      providers: [{ provide: HarvestService, useValue: mockHarvestService }],
    }).compile();

    controller = module.get<HarvestController>(HarvestController);
    service = module.get<HarvestService>(HarvestService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a new harvest', async () => {
    const harvestDTO: AddHarvestDto = { 
      year: 2021,
      farmId: "af0e99ae-8b0c-4755-bbc0-eb88abb0c10e",
      description: 'Safra do primeiro semestre de 2021'
    } as AddHarvestDto;

    const result = await controller.addHarvest(harvestDTO);

    expect(result).toEqual({
      year: 2021,
      farmId: "af0e99ae-8b0c-4755-bbc0-eb88abb0c10e",
      description: 'Safra do primeiro semestre de 2021'
    });
    expect(service.add).toHaveBeenCalledWith(harvestDTO);
    expect(service.add).toHaveBeenCalledTimes(1);
  });
});
