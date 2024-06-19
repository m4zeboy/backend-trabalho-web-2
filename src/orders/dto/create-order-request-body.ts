import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator'
import { Meal } from 'src/meal/entities/meal.entity'

export class CreateOrderRequestBody {
  @ValidateNested()
  @Type(() => Meal)
  public meal: Meal
}
