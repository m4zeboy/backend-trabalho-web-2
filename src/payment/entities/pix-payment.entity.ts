import { ChildEntity, Column } from 'typeorm'
import { OrderPayment } from './order-payment.entity'

@ChildEntity('PIX')
export class PixPayment extends OrderPayment {
  @Column({
    type: 'uuid',
  })
  pix_code: string
}
