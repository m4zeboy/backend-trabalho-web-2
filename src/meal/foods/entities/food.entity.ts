import { BaseEntity } from '@core/entities'
import { Meal } from 'src/meal/entities/meal.entity'
import { Column, Entity, ManyToMany } from 'typeorm'

@Entity()
export class Food extends BaseEntity {
  @Column()
  public name: string

  @Column({
    type: 'int',
  })
  public portion: number

  @Column({
    type: 'int',
  })
  public calories: number

  @ManyToMany(() => Meal, (meal) => meal.foods)
  meals: Meal[]
}
