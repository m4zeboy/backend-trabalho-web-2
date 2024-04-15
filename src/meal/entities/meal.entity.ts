import { BaseEntity } from '@core/entities'
import { Entity, Column } from 'typeorm'

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
}
