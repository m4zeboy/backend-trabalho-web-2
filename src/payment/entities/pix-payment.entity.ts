import { ChildEntity, Column } from 'typeorm'
import { OrderPayment } from './order-payment.entity'

/* Subclasse de pagamento de pix */
@ChildEntity()
export class PixPayment extends OrderPayment {
  @Column({
    type: 'uuid',
  })
  pix_code: string
}
