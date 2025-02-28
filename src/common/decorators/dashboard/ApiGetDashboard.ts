import { ApiResponse, ApiBody } from '@nestjs/swagger';

export function ApiGetDashboard() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiResponse({
      status: 1,
      description: 'Retorna um dashboard contendo todos os dados referentes as fazendas, culturas e safras registradas!',
      schema: {
        example: {
          "totalFarms": 1,
          "totalHectares": 135000,
          "farmsByState": [
              {
                  "state": "Goias",
                  "total": 1
              }
          ],
          "cropsDistribution": [
              {
                  "crop": "Milho",
                  "total": 1
              }
          ],
          "landUsage": {
              "arableArea": 100000,
              "vegetationArea": 35000
          }
      }
      },
    })(target, key, descriptor);
  };
}
