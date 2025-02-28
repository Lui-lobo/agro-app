import { ApiResponse, ApiBody } from '@nestjs/swagger';

export function ApiGetCropsDistribution() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiResponse({
      status: 1,
      description: 'Retorna a distribuição de culturas',
      schema: {
        example: [
          {
              "crop": "Milho",
              "total": 1
          }
      ]
      },
    })(target, key, descriptor);
  };
}
