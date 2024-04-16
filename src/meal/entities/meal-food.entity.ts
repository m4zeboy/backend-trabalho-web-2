import { Entity, ManyToOne } from 'typeorm'
import { Meal } from './meal.entity'
import { Food } from '../foods/entities/food.entity'
import { BaseEntity } from '@core/entities'

@Entity()
export class MealFood extends BaseEntity {
  @ManyToOne(() => Meal, (meal) => meal.foods)
  meal: Meal

  @ManyToOne(() => Food, (food) => food.meals)
  food: Food
}
