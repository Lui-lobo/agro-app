import { Test, TestingModule } from '@nestjs/testing';
// Importando Controller
import { FarmController } from './farm.controller';
// Importando serviços
import { FarmService } from './farm.service';

describe('FarmController', () => {
  let controller: FarmController;
  let service: FarmService;

  beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [FarmController],
        providers: [
          FarmService,
          {
            provide: FarmService, // Mock do service
            useValue: {
              addFarm: jest.fn(),
            },
          },
        ],
      }).compile();
  
      controller = module.get<FarmController>(FarmController);
      service = module.get<FarmService>(FarmService);
    });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
