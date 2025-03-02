// Importando controller
import { Controller, Get } from '@nestjs/common';
// Importando serviços
import { DashboardService } from './dashboard.service';
// Importando decoradores de documentação
import { ApiGetDashboard } from '../..//common/decorators/dashboard/ApiGetDashboard';
// Importando declarador de operação do swagger
import { ApiOperation } from '@nestjs/swagger';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    // Vamos posteriormente separar essas apis em suas rotas corretas
    // Nem todas as rotas que o dashboard utilizam vem da rota de dashboard.
    @Get()
    @ApiOperation({ summary: 'Retorna um dashboard com todos os dados referentes as fazendas com suas safras e culturas.' })
    @ApiGetDashboard()
    getDashboard() {
      return this.dashboardService.getDashboardData();
    }
}
