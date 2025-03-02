// imports comuns do nest
import { Controller, Logger, Post, Body, Get } from '@nestjs/common';
// Importando serviço
import { CropService } from './crop.service';
// Importando decoradores do swagger
import { ApiOperation } from '@nestjs/swagger';
// Importando DTOs
import { AddCropDto } from '../../utils/dtos/crop/crop.dto';
// Importando Modelos
import { Crop } from '@prisma/client';
// importando decoradores de documentação
import { ApiAddCrop } from '../../common/decorators/crop/ApiAddCrop';
import { ApiGetCropsDistribution } from '../..//common/decorators/crop/ApiGetCropsDistribution';

// Criando Logger
const logger = new Logger('cropController');

@Controller('crop')
export class CropController {
    constructor(private readonly cropService: CropService) {}

    // As rotas estão sendo validadas pelo nosso Pipe global
    @Post('/add')
    @ApiOperation({ summary: 'Adiciona uma nova cultura de plantação' })
    @ApiAddCrop()
    addCrop(@Body() cropData: AddCropDto): Promise<Crop> {
        logger.log(`Adding crop with data: ${JSON.stringify(cropData)}`);
        return this.cropService.addCrop(cropData);
    }

    @Get('/cropsDistribution')
    @ApiOperation({ summary: 'Busca todas as culturas de plantação e as retorna em uma lista' })
    @ApiGetCropsDistribution()
    getCropsDistribution() {
      return this.cropService.getCropsDistribution();
    }
    
}
