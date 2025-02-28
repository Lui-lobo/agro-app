import { Test, TestingModule } from '@nestjs/testing';
// Importando controller
import { CropController } from './crop.controller';
// Importando serviços
import { CropService } from './crop.service';
// Importando DTOs
import { AddCropDto } from 'src/utils/dtos/crop/crop.dto';
// Importando modelo
import { Crop } from '@prisma/client';

describe('CropController', () => {
  let controller: CropController;
  let service: CropService;

  // Mockando o serviço de cultura
  const mockCropService = {
    addCrop: jest.fn().mockImplementation((dto: AddCropDto) => {
      return Promise.resolve({
        harvestId: dto.harvestId,
        name: dto.name,
      } as Crop);
    }),
    getCropsDistribution: jest.fn().mockResolvedValue([
      { id: '998c2fd5-4518-447e-806a-4e2ef999beae', name: 'Trigo' }
    ]),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropController],
      providers: [{ provide: CropService, useValue: mockCropService }],
    }).compile();

    controller = module.get<CropController>(CropController);
    service = module.get<CropService>(CropService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a crop', async () => {
    const cropDto: AddCropDto = { name: 'Trigo', harvestId: '998c2fd5-4518-447e-806a-4e2ef999beae' };
    const result = await controller.addCrop(cropDto);

    expect(result).toEqual({ harvestId: '998c2fd5-4518-447e-806a-4e2ef999beae', name: 'Trigo' });
    expect(service.addCrop).toHaveBeenCalledWith(cropDto);
    expect(service.addCrop).toHaveBeenCalledTimes(1);
  });

  it('Should return the list of cultures distribution', async () => {
    const result = await controller.getCropsDistribution();

    expect(result).toEqual([
      { id: '998c2fd5-4518-447e-806a-4e2ef999beae', name: 'Trigo' }
    ]);
    expect(service.getCropsDistribution).toHaveBeenCalledTimes(1);
  });
});
