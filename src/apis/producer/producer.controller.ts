// Importando utilitários do nestJs
import { Controller, Post, Body, Logger, Put, Delete, Query } from '@nestjs/common';
// Importando serviços do produtor
import { ProducerService } from './producer.service';
// Importando DTOs (Data Transfer Objects)
import { CreateProducerDto, DeleteProducerDto, UpdateProducerDto } from '../../utils/dtos/producer/producer.dto';
// Importando decoradores do swagger
import { ApiOperation } from '@nestjs/swagger';
// Importando modelo do producer
import { Producer } from '@prisma/client';
// Importando decoradores
import { ApiCreateProducer } from '../../common/decorators/producer/ApiCreateProducer';
import { ApiUpdateProducer } from '../../common/decorators/producer/ApiUpdateProducer';
import { ApiDeleteProducer } from '../../common/decorators/producer/ApiDeleteProducer';
// Criando Logger
const logger = new Logger('ProducerController');

@Controller('producers')
export class ProducerController {
    constructor(private readonly producerService: ProducerService) {}

    // As rotas estão sendo validadas pelo nosso Pipe global
    @Post('/create')
    @ApiOperation({ summary: 'Cria um novo produtor' })
    @ApiCreateProducer()
    create(@Body() producerData: CreateProducerDto): Promise<Producer> {
        logger.log(`Creating producer with data: ${JSON.stringify(producerData)}`);
        return this.producerService.create(producerData);
    }

    @Put('/update')
    @ApiOperation({ summary: 'Atualiza um produtor' })
    @ApiUpdateProducer()
    update(@Body() producerData: UpdateProducerDto): Promise<Producer> {
        logger.log(`Updating producer with data: ${JSON.stringify(producerData)}`);
        return this.producerService.update(producerData);
    }

    @Delete('/delete')
    @ApiOperation({ summary: 'Deleta um produtor' })
    @ApiDeleteProducer()
    deleteProducer(@Query() deleteProducerDto: DeleteProducerDto) {
        const { producerId } = deleteProducerDto
        logger.log(`Deleting producer with id: ${producerId}`);
        return this.producerService.delete(producerId);
    }
}
