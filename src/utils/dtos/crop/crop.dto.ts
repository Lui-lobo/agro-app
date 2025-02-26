import { IsNotEmpty, IsString } from 'class-validator';

export class AddCropDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Harvest ID is required' })
  @IsString()
  harvestId: string;
}
