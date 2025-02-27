import { Injectable } from '@nestjs/common';
// Importando serviços
import { PrismaService } from '../../prisma/prisma.service';
// Importando metodos
import getTotalFarms from './methods/getTotalFarms';
import getTotalHectares from './methods/getTotalHectares';
import getFarmsByState from './methods/getFarmsByState';
import getCropsDistribution from './methods/getCropsDistribution';
import getLandUsage from './methods/getLandUsage';
import getDashboardData from './methods/getDashboardData';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) {}

    async getTotalFarms() {
        return await getTotalFarms(this.prisma);
    }

    async getTotalHectares() {
        return await getTotalHectares(this.prisma);
    }

    async getFarmsByState() {
        return await getFarmsByState(this.prisma);
    }

    async getCropsDistribution() {
        return await getCropsDistribution(this.prisma);
    }

    async getLandUsage() {
        return await getLandUsage(this.prisma);
    }

    async getDashboardData() {
        return await getDashboardData(this.prisma)
    }
}
