// Importando DTOs
import { UpdateProducerDto } from "../../../utils/dtos/producer/producer.dto";
// Importando serviço do prisma
import { PrismaService } from "../../../prisma/prisma.service";
// Buscando exeções do NestJs
import { NotFoundException, ConflictException, Logger, InternalServerErrorException } from '@nestjs/common';
// Importando serviços
import { cryptoService } from "../../../utils/services/encryptionService";
// Criando Logger
const logger = new Logger('updateProducer');

export default async function updateProducer(prisma: PrismaService, producerUpdateData: UpdateProducerDto) {
    const { id, cpf, cnpj } = producerUpdateData;

    logger.log(`Checking if producer with id ${id} exists`);
    // Verifica se o produtor existe
    const existingProducer = await prisma.producer.findUnique({
        where: { id },
    });

    if (!existingProducer) {
        logger.error(`Producer with id ${id} not found`);
        throw new NotFoundException(`Producer with id ${id} not found`);
    }

    logger.log(`Producer found, validating update informations`);
    // Verifica se cpf ou cnpj foram enviados e se já estão em uso por outro produtor
    if (cpf) {
        const encryptedCpf = cryptoService.encrypt(cpf);

        const existingCpfProducer = await prisma.producer.findFirst({
            where: {
                cpf: encryptedCpf,
                id: { not: id }, // Certifica-se de que não estamos verificando o mesmo produtor
            },
        });

        if (existingCpfProducer) {
            logger.error(`CPF ${cpf} is already in use by another producer`);
            throw new ConflictException(`CPF ${cpf} is already in use by another producer`);
        }

        producerUpdateData.cnpj = null;
        producerUpdateData.cpf = encryptedCpf;
    }

    if (cnpj) {
        const encryptedCnpj = cryptoService.encrypt(cnpj);

        const existingCnpjProducer = await prisma.producer.findFirst({
            where: {
                cnpj: encryptedCnpj,
                id: { not: id }, // Certifica-se de que não estamos verificando o mesmo produtor
            },
        });

        if (existingCnpjProducer) {
            logger.error(`CNPJ ${cnpj} is already in use by another producer`);
            throw new ConflictException(`CNPJ ${cnpj} is already in use by another producer`);
        }

        producerUpdateData.cpf = null;
        producerUpdateData.cnpj = encryptedCnpj;
    }

    try {
        return prisma.producer.update({ where: { id }, data: producerUpdateData });
    } catch (err) {
        logger.error(`Error updating producer with id ${id}: ${err}`);
        throw new InternalServerErrorException(`Error updating producer with id ${id}: ${err}`);
    }
   
}