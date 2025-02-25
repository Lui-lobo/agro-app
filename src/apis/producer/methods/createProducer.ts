// Importando utilitários comuns do nest
import { UnauthorizedException, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
// Importando serviços
import { PrismaService } from "../../../prisma/prisma.service";
// Importando DTOs
import { CreateProducerDto } from "../../../utils/dtos/producer/producer.dto";
import { cryptoService } from '../../../utils/services/encryptionService';
// Importando metodos
import validateCpf from './validateCpf';
import validateCnpj from './validateCnpj';

// Criação de logger
const logger = new Logger('createProducer'); 

export default async function createProducer(prisma: PrismaService, producerDto: CreateProducerDto) {
    const { cpf, cnpj } = producerDto;

    try {
        logger.log(`Validating documents of producer`);
        // Validação e criptografia
        if (cpf) {
            producerDto.cpf = await processIdentifier(cpf, validateCpf, 'CPF');
        } else {
            producerDto.cnpj = await processIdentifier(cnpj, validateCnpj, 'CNPJ');
        }

        return await prisma.producer.create({ data: producerDto });
    } catch (err) {
        // Tratamento de erro do Prisma para violação de chave única
        if (err.code === 'P2002') {
            logger.error(`The ${cpf ? 'CPF' : 'CNPJ'} sended already exists!`);
            throw new BadRequestException(`The ${cpf ? 'CPF' : 'CNPJ'} sended already exists!.`);
        }

        logger.error(`An unexpected error occurred while creating the producer, error: ${err.message}`);
        throw new InternalServerErrorException(err.message);
    }
}

 // Função para validar e criptografar
 const processIdentifier = async (identifier: string, validate: (val: string) => Promise<boolean>, type: 'CPF' | 'CNPJ') => {
    const isValid = await validate(identifier);
    if (!isValid) {
        logger.error(`Invalid ${type}`);
        throw new UnauthorizedException(`Invalid ${type}`);
    }
    return cryptoService.encrypt(identifier);
};