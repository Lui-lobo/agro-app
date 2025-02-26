import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { AreaValidation } from '../../../utils/validations/areaValidation';

export class AddFarmDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'City is required' })
    @IsString()
    city: string;

    @IsNotEmpty({ message: 'State is required' })
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsNumber({}, { message: 'Total area must be a number' })
    totalArea: number;

    @IsNotEmpty()
    @IsNumber({}, { message: 'Arable area must be a number' })
    arableArea: number;

    @IsNotEmpty()
    @IsNumber({}, { message: 'Vegetation area must be a number' })
    vegetationArea: number;

    @IsNotEmpty({ message: 'Producer ID is required' })
    producerId: string;

    @Validate(AreaValidation, {
        message: 'The sum of arable and vegetation areas cannot exceed the total area',
    })
    validateAreas() {
        return { totalArea: this.totalArea, arableArea: this.arableArea, vegetationArea: this.vegetationArea };
    }
}
