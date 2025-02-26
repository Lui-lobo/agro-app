import { ApiResponse, ApiBody } from '@nestjs/swagger';

export function ApiCreateProducer() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiBody({
      required: true,
      schema: {
        example: {
          name: 'Henrique Dos Santos',
          cnpj: '25749836000114',
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 201,
      description: 'O produtor foi adicionado com sucesso!',
      schema: {
        example: {
          id: '219de228-e9ef-48d9-908b-062cf9ed1a8a',
          name: 'Henrique Dos Santos',
          cnpj: 'kAvYXLySL9xapgQ9ufkJBg==',
          createdAt: new Date(),
          cpf: null,
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 400,
      description: 'CNPJ inválido enviado ao serviço!',
      schema: {
        example: {
          statusCode: 401,
          message: 'Invalid CNPJ',
          error: 'Bad Request',
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 401,
      description: 'CPF inválido enviado ao serviço!',
      schema: {
        example: {
          statusCode: 401,
          message: 'Invalid CPF',
          error: 'Bad Request',
        },
      },
    })(target, key, descriptor);
  };
}
