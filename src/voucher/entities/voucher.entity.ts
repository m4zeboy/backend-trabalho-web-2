import { BaseEntity } from '@core/entities'
import { Order } from 'src/orders/entities/order.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity()
export class Voucher extends BaseEntity {
  /* Não precisa colocar o voucher_id, ele vai puxar da base entity */

  @ManyToOne(() => Order, { eager: true })
  @JoinColumn()
  order: Order

  /* Inicialmente pode não existir, pois ainda não foi validado */
  @Column({ nullable: true })
  validated_at?: Date

  @Column()
  expires_in: Date = new Date(Date.now() + 4 * 60 * 60 * 1000)
}
