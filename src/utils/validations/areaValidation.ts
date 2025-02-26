import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'AreaValidation', async: false })
export class AreaValidation implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const object = args.object as any; // Obtém o objeto inteiro do DTO
        const { totalArea, arableArea, vegetationArea } = object;

        if (totalArea === undefined || arableArea === undefined || vegetationArea === undefined) {
            return false; // Garante que todos os valores existam antes da validação
        }

        return arableArea + vegetationArea <= totalArea;
    }

    defaultMessage(args: ValidationArguments) {
        return 'The sum of arable and vegetation areas cannot exceed the total area';
    }
}
