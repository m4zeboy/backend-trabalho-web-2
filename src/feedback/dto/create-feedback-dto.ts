import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested
} from 'class-validator'
import { User } from 'src/auth/users/entities/user.entity'
import { Meal } from 'src/meal/entities/meal.entity'

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public content: string

  @ValidateNested()
  @Type(() => User)
  public commented_by:User

  @ValidateNested()
  @Type(() => Meal)
  public subject:Meal
}
