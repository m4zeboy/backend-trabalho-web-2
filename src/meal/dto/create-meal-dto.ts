import { Type } from 'class-transformer'
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { MealShift } from '../entities/meal.entity'
import { Food } from '../foods/entities/food.entity'

export class CreateMealDto {
  // Não é necessário colocar o meal_id pois é gerado automaticamente
  // e o mesmo não percorre pelo DTO.
  @IsDateString()
  @IsNotEmpty()
  public meal_date: Date

  @IsEnum(MealShift)
  @IsNotEmpty()
  @MinLength(3)
  public shift: MealShift

  @IsNotEmpty()
  @Min(1)
  @IsNumber({ maxDecimalPlaces: 2 }) // Definindo a precisão para 2 casas decimais igual esta na entidade
  public price: number // Utilizando o number mesmo para representar os valores decimais

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  public availability: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Food)
  public foods: Food[]
}
