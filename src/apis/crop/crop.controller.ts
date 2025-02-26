// imports comuns do nest
import { Controller, Logger } from '@nestjs/common';
// Importando serviço
import { CropService } from './crop.service';

// Criando Logger
const logger = new Logger('cropController');

@Controller('crop')
export class CropController {
    constructor(private readonly cropService: CropService) {}
}
