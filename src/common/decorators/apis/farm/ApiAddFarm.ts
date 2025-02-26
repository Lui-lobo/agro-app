import { ApiResponse, ApiBody } from '@nestjs/swagger';

export function ApiAddFarm() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiBody({
      required: true,
      schema: {
        example: {
          name: "Fazenda Nova Piratininga",
          city: "São Miguel do Araguaia",
          state: "Goias",
          totalArea: 135000,
          arableArea: 100000,
          vegetationArea: 35000,
          producerId: "d8c7f8cd-00cf-454d-aac6-7464a3c29b82"
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 1,
      description: 'A fazenda foi adicionada com sucesso para o produtor!',
      schema: {
        example: {
            id: "af0e99ae-8b0c-4755-bbc0-eb88abb0c10e",
            name: "Fazenda Nova Piratininga",
            city: "São Miguel do Araguaia",
            state: "Goias",
            totalArea: 135000,
            arableArea: 100000,
            vegetationArea: 35000,
            producerId: "d8c7f8cd-00cf-454d-aac6-7464a3c29b82"
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 2,
      description: 'A soma da area de vegetação e area agricultável excede a area total!',
      schema: {
        example: {
          statusCode: 400,
          message: 'The sum of arable and vegetation areas cannot exceed the total area',
          error: 'Bad Request',
        },
      },
    })(target, key, descriptor);

    ApiResponse({
      status: 3,
      description: 'Produtor enviado não foi encontrado nos registros',
      schema: {
        example: {
          statusCode: 404,
          message: 'Producer not found',
          error: 'Not Found',
        },
      },
    })(target, key, descriptor);

    ApiResponse({
        status: 4,
        description: 'Houve um erro fatal ao tentar adicionar a nova fazenda ao produtor enviado',
        schema: {
          example: {
            statusCode: 500,
            message: 'Fatal error occurred while adding a new farm to the producer.',
            error: 'Internal Server Error',
          },
        },
      })(target, key, descriptor);

  };
}
