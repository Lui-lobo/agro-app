import { ApiResponse, ApiBody } from '@nestjs/swagger';

export function ApiGetCropsDistribution() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
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
  };
}
