import { ApiResponse } from '@nestjs/swagger';

export function ApiGetTotalHectares() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiResponse({
      status: 1,
      description: 'A fazenda foi adicionada com sucesso para o produtor!',
      schema: {
        example: {
          totalHectares: 135000
        }
      },
    })(target, key, descriptor);
  };
}
