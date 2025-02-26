import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class AddHarvestDto {
  @IsNotEmpty({ message: 'Year is required' })
  @IsInt({ message: 'Year must be an integer' })
  year: number;

  @IsNotEmpty({ message: 'Farm ID is required' })
  @IsString()
  farmId: string;
}