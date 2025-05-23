// Importando modulos de teste do nest
import { Test, TestingModule } from '@nestjs/testing';
// Importando Serviço de fazenda/propriedade
import { CropService } from '../../crop.service';
import { PrismaService } from '../../../../prisma/prisma.service';
// Importando controllers
import { CropController } from '../../crop.controller';

describe('Get crop by distribution', () => {
  let service: CropService;
  let controller: CropController;
  let prismaService: PrismaService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [CropController],
        providers: [
            CropService,
          {
            provide: PrismaService,
            useValue: {
              crop: {
                groupBy: jest.fn()
              }
            },
          },
        ],
      }).compile();
  
      controller = module.get<CropController>(CropController);
      service = module.get<CropService>(CropService);
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

  it('Should return the distribution of the crops planted', async () => {
    // @ts-ignore -> Comentário necessário pois ts com prisma indica dependencia circular nesse caso.
    jest.spyOn(prismaService.crop, 'groupBy').mockResolvedValue([
      { name: 'Soja', _count: { id: 7 } },
      { name: 'Milho', _count: { id: 4 } },
    ]);
  
    const result = await service.getCropsDistribution();

    expect(result).toEqual([
      { crop: 'Soja', total: 7 },
      { crop: 'Milho', total: 4 },
    ]);
  });

  it('Should return a empty distribution of the crops planted', async () => {
    jest.spyOn(prismaService.crop, 'groupBy').mockResolvedValue([]);
  
    const result = await service.getCropsDistribution();

    expect(result).toEqual([]);
  });
});
