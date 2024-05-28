import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { Order } from 'src/orders/entities/order.entity'

export class CreatePixPaymentDto {
  @ValidateNested()
  @Type(() => Order)
  public order: Order
}
