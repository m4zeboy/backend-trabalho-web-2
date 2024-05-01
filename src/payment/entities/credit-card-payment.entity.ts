import { ChildEntity, Column } from 'typeorm'
import { OrderPayment } from './order-payment.entity'

/* Subclasse de pagamento de cartão de crédito */
@ChildEntity()
export class CreditCardPayment extends OrderPayment {
  @Column()
  card_number: string

  @Column()
  expiration_date: Date

  @Column()
  security_code: number

  @Column()
  account_holder: string
}
