import { Module } from '@nestjs/common';
import { CropService } from './crop.service';
import { CropController } from './crop.controller';

@Module({
  providers: [CropService],
  controllers: [CropController]
})
export class CropModule {}
