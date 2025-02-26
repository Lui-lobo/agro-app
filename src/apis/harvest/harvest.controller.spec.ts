import { Test, TestingModule } from '@nestjs/testing';
// Importando controller
import { HarvestController } from './harvest.controller';
// Importando services
import { HarvestService } from './harvest.service';

describe('HarvestController', () => {
  let controller: HarvestController;
  let service: HarvestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestController],
      providers: [
        HarvestService,
        {
          provide: HarvestService, // Mock do service
          useValue: {
            addFarm: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HarvestController>(HarvestController);
    service = module.get<HarvestService>(HarvestService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
