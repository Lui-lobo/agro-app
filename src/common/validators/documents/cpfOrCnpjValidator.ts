import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  
// Validator customizado para garantir que apenas um dos campos (cnpj ou cpf) seja fornecido
@ValidatorConstraint({ name: 'EitherCnpjOrCpf', async: false })
export class CpfOrCnpjValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const object = args.object as any; // Obtém o objeto DTO

    // Verifica se ambos os campos (cnpj e cpf) estão preenchidos
    const bothProvided = object.cnpj && object.cpf;

    // Retorna false se ambos estiverem preenchidos, true caso contrário
    return !bothProvided;
  }

  defaultMessage(args: ValidationArguments) {
    return 'You must provide either CPF or CNPJ, but not both.';
  }
}
  