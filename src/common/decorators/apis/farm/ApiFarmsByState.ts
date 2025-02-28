import { ApiResponse, ApiBody } from '@nestjs/swagger';

export function ApiFarmsByState() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiResponse({
      status: 1,
      description: 'A fazenda foi adicionada com sucesso para o produtor!',
      schema: {
        example: [
          {
            state: "Goias",
            total: 1
          }
      ]
      },
    })(target, key, descriptor);;
  };
}
