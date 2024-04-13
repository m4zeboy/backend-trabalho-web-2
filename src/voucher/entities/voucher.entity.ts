import { BaseEntity } from '@core/entities'
import { Column, Entity } from 'typeorm'

@Entity()
export class Voucher extends BaseEntity {
  /* Não precisa colocar o voucher_id, ele vai puxar da base entity */

  @Column()
  order_id: number

  /* Inicialmente pode não existir, pois ainda não foi validado */
  @Column()
  validated_at?: Date

  @Column({
    type: 'timestamp',
  })
  expires_in: Date
}
