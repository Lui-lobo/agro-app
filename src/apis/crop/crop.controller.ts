// imports comuns do nest
import { Controller, Logger, Post, Body } from '@nestjs/common';
// Importando serviço
import { CropService } from './crop.service';
// Importando decoradores do swagger
import { ApiOperation } from '@nestjs/swagger';
// Importando DTOs
import { AddCropDto } from '../../utils/dtos/crop/crop.dto';
// Importando Modelos
import { Crop } from '@prisma/client';
// importando decoradores
import { ApiAddCrop } from '../../common/decorators/crop/ApiAddCrop';

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
}
