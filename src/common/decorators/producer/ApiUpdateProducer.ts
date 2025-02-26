import { ApiResponse, ApiBody } from '@nestjs/swagger';

export function ApiUpdateProducer() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiBody({
      required: true,
      schema: {
        example: {
          id: '52f06fe8-4e24-4fcd-8bdf-da84160354a9',
          name: 'Henrique novo 3',
          cnpj: '25749836000114',
          cpf: '257498360'
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 1,
      description: 'O produtor foi atualizado com sucesso!',
      schema: {
        example: {
          id: '219de228-e9ef-48d9-908b-062cf9ed1a8a',
          name: 'Henrique novo 3',
          cnpj: 'SW88JA6E9ywN3mBgYJ5wFQ==',
          createdAt: new Date(),
          cpf: null,
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 2,
      description: 'CNPJ inválido enviado ao serviço!',
      schema: {
        example: {
          statusCode: 400,
          message: 'Invalid CNPJ',
          error: 'Bad Request',
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 3,
      description: 'CPF inválido enviado ao serviço!',
      schema: {
        example: {
          statusCode: 401,
          message: 'Invalid CPF',
          error: 'Bad Request',
        },
      },
    })(target, key, descriptor);

    ApiResponse({
        status: 4,
        description: 'Produtor enviado não encontrado nos registros!',
        schema: {
          example: {
            statusCode: 404,
            message: 'Producer with id ${id} not found',
            error: 'Not Found',
          },
        },
      })(target, key, descriptor);

      ApiResponse({
        status: 5,
        description: 'Produtor enviado não encontrado nos registros!',
        schema: {
          example: {
            statusCode: 409,
            message: 'CPF ${cpf} is already in use by another producer',
            error: 'conflict',
          },
        },
      })(target, key, descriptor);

      ApiResponse({
        status: 6,
        description: 'Produtor enviado não encontrado nos registros!',
        schema: {
          example: {
            statusCode: 409,
            message: 'CNPJ ${cnpj} is already in use by another producer',
            error: 'conflict',
          },
        },
      })(target, key, descriptor);

      ApiResponse({
        status: 7,
        description: 'Produtor enviado não encontrado nos registros!',
        schema: {
          example: {
            statusCode: 500,
            message: 'Error updating producer with id ${id}: ${err}',
            error: 'internal server error',
          },
        },
      })(target, key, descriptor);
  };
}
