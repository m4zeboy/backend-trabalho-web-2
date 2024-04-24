import { BaseEntity } from '@core/entities'
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm'
import { Food } from '../foods/entities/food.entity'


export enum MealShift {
  LUNCH = "LUNCH",
  DINNER = "DINNER"
}

@Entity()
export class Meal extends BaseEntity {
  @Column({ type: 'date' })
  public meal_date: Date

  @Column({
    enum: ['LUNCH', 'DINNER'],
    default: 'LUNCH'
  }) // Não é necessário colocar o type para string, o typeORM usa string como padrão.
  public shift: MealShift

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  public price: number

  @Column({
    type: 'int',
  })
  public availability: number

  @ManyToMany(() => Food, (food) => food.meals, { eager: true })
  @JoinTable()
  foods: Food[]
}
