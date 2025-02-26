import { ApiResponse, ApiBody } from '@nestjs/swagger';

export function ApiAddHarvest() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiBody({
      required: true,
      schema: {
        example: {
          year: 2021,
          farmId: 'af0e99ae-8b0c-4755-bbc0-eb88abb0c10e'
        }
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 1,
      description: 'A safra foi adicionada com sucesso para a fazenda!',
      schema: {
        example: {
            id: '1c5236c7-65d1-49f5-85f5-7c1081802c3f',
            year: 2021,
            farmId: 'af0e99ae-8b0c-4755-bbc0-eb88abb0c10e'
        }
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 2,
      description: 'A fazenda enviada não foi encontrada nos registros!',
      schema: {
        example: {
          statusCode: 400,
          message: 'Farm not found',
          error: 'Not Found',
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 3,
      description: 'Ocorreu um erro ao tentar criar a safra',
      schema: {
        example: {
          statusCode: 404,
          message: 'A fatal error occured when creating harvest -> ${JSON.stringify(err)}',
          error: 'Internal Server Error',
        },
      },
    })(target, key, descriptor);
  };
}
