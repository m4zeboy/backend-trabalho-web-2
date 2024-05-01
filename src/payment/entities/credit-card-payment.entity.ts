import { ChildEntity, Column } from 'typeorm'
import { OrderPayment } from './order-payment.entity'

@ChildEntity()
export class CreditCardPayment extends OrderPayment {
  @Column()
  card_number?: string

  @Column()
  expiration_date?: Date // Checar herança depois.

  @Column()
  security_code?: number

  @Column()
  account_holder?: string
}
