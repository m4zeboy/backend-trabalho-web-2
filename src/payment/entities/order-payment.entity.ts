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

/* Possíveis estados de um pagamento, o valor padrão é PENDING */
export enum OrderPaymentState {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

/* Classe pai de pagamentos */
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

  @Column({ nullable: true })
  public closed_at?: Date;
}
