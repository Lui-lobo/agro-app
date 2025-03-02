// Imports comuns
import { Injectable } from '@nestjs/common';
// Import Services
import { PrismaService } from '../../prisma/prisma.service';
// Import DTOs
import { AddFarmDto } from '../../utils/dtos/farms/farms.dto';
// Import Methods
import addFarm from './methods/addFarm';
import getFarmsByState from './methods/getFarmsByState';
import getLandUsage from './methods/getLandUsage';
import getTotalFarms from './methods/getTotalFarms';
import getTotalHectares from './methods/getTotalHectares';

@Injectable()
export class FarmService {
    constructor(private readonly prisma: PrismaService) {}

    async addFarm(farmData: AddFarmDto) {
        return await addFarm(this.prisma, farmData);
    }

    async getFarmsByState() {
        return await getFarmsByState(this.prisma);
    }

     async getLandUsage() {
        return await getLandUsage(this.prisma);
    }

     async getTotalFarms() {
        return await getTotalFarms(this.prisma);
    }

    async getTotalHectares() {
        return await getTotalHectares(this.prisma);
    }
}
