import { Test, TestingModule } from '@nestjs/testing';
// Importando controller
import { CropController } from './crop.controller';
// Importando serviços
import { CropService } from './crop.service';

describe('CropController', () => {
  let controller: CropController;
  let service: CropService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropController],
      providers: [
        CropService,
        {
          provide: CropService, // Mock do service
          useValue: {
            addCrop: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CropController>(CropController);
    service = module.get<CropService>(CropService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
