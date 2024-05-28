import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator'
import { User } from 'src/auth/users/entities/user.entity'
import { Meal } from 'src/meal/entities/meal.entity'

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => User)
  public requester: User

  @ValidateNested()
  @Type(() => Meal)
  public meal: Meal

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  public discount: number
}
