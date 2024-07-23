import {
  CreateDateColumn,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm'
import { Order } from 'src/orders/entities/order.entity'
import { BaseEntity } from '@core/entities'

@Entity()
export class Voucher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Order, { eager: true })
  @JoinColumn()
  order: Order

  @Column({ nullable: true })
  validated_at?: Date

  @Column()
  expires_in: Date = new Date(Date.now() + 4 * 60 * 60 * 1000)
}
