// Imports comuns do nestJs
import { Controller, Post, Body, Logger, Get } from '@nestjs/common';
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
import { ApiGetTotalFarms } from '../../common/decorators/apis/farm/ApiGetTotalFarms';
import { ApiLandUsage } from '../../common/decorators/apis/farm/ApiLandUsage';
import { ApiFarmsByState } from '../../common/decorators/apis/farm/ApiFarmsByState';
import { ApiGetTotalHectares } from '../../common/decorators/apis/farm/ApiGetTotalHectares';

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

    @Get('/farmsByState')
    @ApiOperation({ summary: 'Busca a quantidade de fazendas registradas por estado' })
    @ApiFarmsByState()
    getFarmsByState() {
      return this.farmService.getFarmsByState();
    }

    @Get('/landUsage')
    @ApiOperation({ summary: 'Busca o total de terras utilizadas registradas!' })
    @ApiLandUsage()
    getLandUsage() {
      return this.farmService.getLandUsage();
    }
    
    @Get('/farms')
    @ApiOperation({ summary: 'Conta todas as fazendas registradas!' })
    @ApiGetTotalFarms()
    getTotalFarms() {
      return this.farmService.getTotalFarms();
    }

    @Get('/hectares')
    @ApiOperation({ summary: 'Busca o total de hectares registrados no sistema!' })
    @ApiGetTotalHectares()
    getTotalHectares() {
      return this.farmService.getTotalHectares();
    }
}
