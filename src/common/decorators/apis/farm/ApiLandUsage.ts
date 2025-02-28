import { ApiResponse, ApiBody } from '@nestjs/swagger';

export function ApiLandUsage() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiResponse({
      status: 1,
      description: 'A fazenda foi adicionada com sucesso para o produtor!',
      schema: {
        example: {
        arableArea: 100000,
        vegetationArea: 35000
      }
      },
    })(target, key, descriptor);;
  };
}
