// Importando controller
import { Controller, Get } from '@nestjs/common';
// Importando serviços
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    // Vamos posteriormente separar essas apis em suas rotas corretas
    // Nem todas as rotas que o dashboard utilizam vem da rota de dashboard.
    @Get()
    getDashboard() {
      return this.dashboardService.getDashboardData();
    }

    @Get('/farms')
    getTotalFarms() {
      return this.dashboardService.getTotalFarms();
    }

    @Get('/hectares')
    getTotalHectares() {
      return this.dashboardService.getTotalHectares();
    }   
    @Get('/farmsByState')
    getFarmsByState() {
      return this.dashboardService.getFarmsByState();
    }

    @Get('/cropsDistribution')
    getCropsDistribution() {
      return this.dashboardService.getCropsDistribution();
    }
    
    @Get('/landUsage')
    getLandUsage() {
      return this.dashboardService.getLandUsage();
    }
    
}
