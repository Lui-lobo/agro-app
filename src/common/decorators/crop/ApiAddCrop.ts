import { ApiResponse, ApiBody } from '@nestjs/swagger';

export function ApiAddCrop() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiBody({
      required: true,
      schema: {
        example: {
          name: "Milho",
          harvestId: "805c572a-c47c-45b2-8654-6a5eb1fb5798"
        }
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 1,
      description: 'A cultura foi adicionada com sucesso para a safra!',
      schema: {
        example: {
          id: "b1706eeb-5691-495a-ae34-fb123e752c0d",
          name: "Milho",
          harvestId: "805c572a-c47c-45b2-8654-6a5eb1fb5798"
        }
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 2,
      description: 'A safra enviada não foi encontrada nos registros!',
      schema: {
        example: {
          statusCode: 400,
          message: 'Harvest not found',
          error: 'Not Found',
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 3,
      description: 'Ocorreu um erro ao tentar criar a cultura enviada',
      schema: {
        example: {
          statusCode: 404,
          message: 'A fatal error occured when creating crop -> ${JSON.stringify(err)}',
          error: 'Internal Server Error',
        },
      },
    })(target, key, descriptor);
  };
}
