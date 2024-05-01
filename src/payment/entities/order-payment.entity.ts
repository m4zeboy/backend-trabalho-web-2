import { BaseEntity } from '@core/entities'
import { Order } from 'src/orders/entities/order.entity'
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  TableInheritance,
  Unique,
} from 'typeorm'

export enum OrderPaymentState {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class OrderPayment extends BaseEntity {
  @OneToOne(() => Order, { eager: true })
  @JoinColumn()
  @Unique(['orderId'])
  public order: Order

  @Column({
    enum: OrderPaymentState,
    default: OrderPaymentState.PENDING,
  })
  public state: OrderPaymentState
}
