// Imports comuns
import { Injectable } from '@nestjs/common';
// Import Services
import { PrismaService } from '../../prisma/prisma.service';
// Import DTOs
import { AddFarmDto } from '../../utils/dtos/farms/farms.dto';
// Import Methods
import addFarm from './methods/addFarm';

@Injectable()
export class FarmService {
    constructor(private readonly prisma: PrismaService) {}

    async addFarm(farmData: AddFarmDto) {
        return await addFarm(this.prisma, farmData);
    }
}
