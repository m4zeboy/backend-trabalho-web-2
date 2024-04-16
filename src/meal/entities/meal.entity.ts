import { BaseEntity } from '@core/entities'
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm'
import { Food } from '../foods/entities/food.entity'

@Entity()
export class Meal extends BaseEntity {
  @Column({ type: 'date' })
  public meal_date: Date

  @Column() // Não é necessário colocar o type para string, o typeORM usa string como padrão.
  public shift: string

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
