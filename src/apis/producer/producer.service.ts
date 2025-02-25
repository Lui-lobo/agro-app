// Importando utilitários do Jest
import { Injectable } from '@nestjs/common';
// Importando serviço do Prisma ORM
import { PrismaService } from '../../prisma/prisma.service';
// Importando metodos
import createProducer from './methods/createProducer';
import updateProducer from './methods/updateProducer';
import deleteProducer from './methods/deleteProducer';
// Importando DTOs (Data Transfer Objects)
import { CreateProducerDto, UpdateProducerDto } from '../../utils/dtos/producer/producer.dto';
// Importando modelo do producer
import { Producer } from '@prisma/client';


@Injectable()
export class ProducerService {
    constructor(private prisma: PrismaService) {}

    async create(producerData: CreateProducerDto): Promise<Producer> {
        return await createProducer(this.prisma, producerData);
    }

    async update(producerUpdateData: UpdateProducerDto) {
        return await updateProducer(this.prisma, producerUpdateData)
    }

    async delete(producerId: string) {
        return await deleteProducer(this.prisma, producerId);
    }
}
