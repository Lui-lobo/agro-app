import { Injectable } from '@nestjs/common';
// Importando serviços
import { PrismaService } from '../../prisma/prisma.service';
// Importando metodos
import getDashboardData from './methods/getDashboardData';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) {}
    
    async getDashboardData() {
        return await getDashboardData(this.prisma)
    }
}
