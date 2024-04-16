import { BaseEntity } from '@core/entities'
import { Column, Entity } from 'typeorm'

@Entity()
export class Order extends BaseEntity {
  @Column()
  public requester: string

  @Column()
  public requested_at: Date

  @Column()
  public state: string

  @Column({
    type: 'int',
  })
  public meal_id: number

  @Column({
    type: 'decimal',
  })
  public total_price: number
}
