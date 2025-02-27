// Importando serviço do prisma
import { PrismaService } from "../../../prisma/prisma.service";
// Importando logger
import { Logger } from "@nestjs/common";
// Criação de logger
const logger = new Logger('getFarmsByState'); 

export default async function getFarmsByState(prisma: PrismaService) {
    const farmsByState = await prisma.farm.groupBy({
        by: ['state'],
        _count: { id: true },
    });

    const findedFarmsByState = farmsByState.map((state) => ({
      state: state.state,
      total: state._count.id,
    }));

    return findedFarmsByState;
}