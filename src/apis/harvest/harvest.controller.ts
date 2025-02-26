// Imports comuns do nestJs
import { Controller, Post, Body, Logger } from '@nestjs/common';
// Importando serviços
import { HarvestService } from './harvest.service';
// Importando decoradores do swagger
import { ApiOperation } from '@nestjs/swagger';
// Importando DTOs
import { AddHarvestDto } from '../../utils/dtos/harvest/harvest.dto';
// Importando modelo de harvest/safra
import { Harvest } from '@prisma/client';
// Importando decorators
import { ApiAddHarvest } from '../../common/decorators/harvest/ApiAddHarvest';

// Criando Logger
const logger = new Logger('harvestController');

@Controller('harvest')
export class HarvestController {
    constructor(private readonly harvestService: HarvestService) {}

    @Post('/add')
    @ApiOperation({ summary: 'Adiciona uma nova safra para uma fazenda' })
    @ApiAddHarvest()
    addHarvest(@Body() harvestData: AddHarvestDto): Promise<Harvest> {
        logger.log(`Adding Harvest with data: ${JSON.stringify(harvestData)}`);
        return this.harvestService.add(harvestData);
    }
}
