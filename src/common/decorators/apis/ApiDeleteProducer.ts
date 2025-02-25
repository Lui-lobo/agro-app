import { ApiResponse, ApiBody } from '@nestjs/swagger';

export function ApiDeleteProducer() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiBody({
      required: true,
      schema: {
        example: {
          producerId: '12aacb56-65f5-4ed5-99c1-a161533c082b'
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 1,
      description: 'O produtor foi deletado com sucesso!',
      schema: {
        example: {
          id: '12aacb56-65f5-4ed5-99c1-a161533c082b',
          name: 'Henrique Agricultor 3',
          cnpj: 'HI7sgDC5vcoLbEx45qr3xQ==',
          createdAt: new Date(),
          cpf: null,
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 2,
      description: 'Produtor não encontrado',
      schema: {
        example: {
          statusCode: 404,
          message: 'Producer with id ${producerId} not found',
          error: 'Not Found',
        },
      },
    })(target, key, descriptor);

    ApiResponse({
        status: 3,
        description: 'Produtor enviado ainda está relacionado a fazendas/propriedades e suas tabelas!',
        schema: {
          example: {
            statusCode: 409,
            message: 'Cannot delete producer with id ${producerId} because there are associated farms/properties.',
            error: 'Conflict',
          },
        },
    })(target, key, descriptor);
  };
}
