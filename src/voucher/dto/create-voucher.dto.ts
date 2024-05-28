import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { Order } from 'src/orders/entities/order.entity'

// Definindo as regras de validação para os dados de entrada dos vouchers
export class CreateVoucherDto {
  // Não é necessário colocar o voucher_id pois é gerado automaticamente
  // e o mesmo não percorre pelo DTO.

  @ValidateNested()
  @Type(() => Order)
  public order: Order

  /* para criar não precisa do validated_at */
}
