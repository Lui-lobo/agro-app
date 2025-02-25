import { IsNotEmpty, IsString, Matches, ValidateIf, Validate, IsOptional, isString } from 'class-validator';
// Importando validador customizado de cpf e cnpj
import { CpfOrCnpjValidator } from '../../../common/validators/documents/cpfOrCnpjValidator';
// Importando decoradores
import { ApiProperty } from '@nestjs/swagger';

export class CreateProducerDto {
  @ApiProperty({ description: 'Nome do produtor' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Cpf do produtor' })
  @ValidateIf((producer) => !producer.cnpj) // CPF é validado apenas se CNPJ não for enviado
  @IsNotEmpty({ message: 'CPF or CNPJ is required' })
  @IsString()
  @Matches(/^\d{11}$/, { message: 'CPF must have exactly 11 digits and be valid' })
  cpf?: string;

  @ApiProperty({ description: 'Cnpj do produtor' })
  @ValidateIf((producer) => !producer.cpf) // CNPJ é validado apenas se CPF não for enviado
  @IsNotEmpty({ message: 'CPF or CNPJ is required' })
  @IsString()
  @Matches(/^\d{14}$/, { message: 'CNPJ must have exactly 14 digits and be valid' })
  cnpj?: string;

  @Validate(CpfOrCnpjValidator)
  validateCpfOrCnpj: boolean;
}

export class UpdateProducerDto {
    @ApiProperty({ description: 'Identificador único do produtor' })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ description: 'Novo nome do produto'})
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({ description: 'Cpf do produtor' })
    @ValidateIf((producer) => !producer.cnpj) // CPF é validado apenas se CNPJ não for enviado
    @IsString()
    @Matches(/^\d{11}$/, { message: 'CPF must have exactly 11 digits and be valid' })
    @IsOptional()
    cpf?: string;

    @ApiProperty({ description: 'Cnpj do produtor' })
    @ValidateIf((producer) => !producer.cpf) // CNPJ é validado apenas se CPF não for enviado
    @IsString()
    @Matches(/^\d{14}$/, { message: 'CNPJ must have exactly 14 digits and be valid' })
    @IsOptional()
    cnpj?: string;

    @Validate(CpfOrCnpjValidator)
    validateCpfOrCnpj: boolean;
}

export class DeleteProducerDto {
  @ApiProperty({ description: 'Identificador do produtor' })
  @IsNotEmpty({ message: 'producerId is required and cannot be empty' })
  @IsString()
  producerId: string;
}