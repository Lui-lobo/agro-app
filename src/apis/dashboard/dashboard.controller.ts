// Importando controller
import { Controller, Get } from '@nestjs/common';
// Importando serviços
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

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
    @Get('/farms-by-state')
    getFarmsByState() {
      return this.dashboardService.getFarmsByState();
    }   
    @Get('/crops-distribution')
    getCropsDistribution() {
      return this.dashboardService.getCropsDistribution();
    }   
    @Get('/land-usage')
    getLandUsage() {
      return this.dashboardService.getLandUsage();
    }
    
}
