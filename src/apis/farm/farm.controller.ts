// Imports comuns do nestJs
import { Controller, Post, Body, Logger } from '@nestjs/common';
// Importando serviço de fazenda/propriedade
import { FarmService } from './farm.service';
// Importando decoradores do swagger
import { ApiOperation } from '@nestjs/swagger';
// Importando modelo de fazenda
import { Farm } from '@prisma/client';
// Importando DTOs
import { AddFarmDto } from '../../utils/dtos/farms/farms.dto';
// Importando decorators
import { ApiAddFarm } from '../../common/decorators/apis/farm/ApiAddFarm';

// Criando Logger
const logger = new Logger('ProducerController');

@Controller('farm')
export class FarmController {
    constructor(private readonly farmService: FarmService) {}

     // As rotas estão sendo validadas pelo nosso Pipe global
    @Post('/add')
    @ApiOperation({ summary: 'Adiciona uma nova fazenda' })
    @ApiAddFarm()
    addFarm(@Body() farmData: AddFarmDto): Promise<Farm> {
        logger.log(`Adding farm with data: ${JSON.stringify(farmData)}`);
        return this.farmService.addFarm(farmData);
    }
}
