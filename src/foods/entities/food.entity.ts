import { BaseEntity } from '@core/entities'
import { Column, Entity } from 'typeorm'

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
}
