import { RecordNotFoundException } from '@exceptions/record-not-found.exception'
import { Body, Controller, Param, Patch } from '@nestjs/common'
import { UpdateOrderDto } from '../dto/update-order-dto'
import { OrdersService } from '../orders.service'

@Controller('orders')
export class SetOrderPaymentMethodController {
  constructor(private readonly ordersService: OrdersService) {}

  /* Serve para definir qual método de pagamento vai ser usado */
  @Patch(':id/payment')
  async execute(@Param('id') id: number, @Body() body: UpdateOrderDto) {
    /* Verfica se o pedido existe */
    const doesOrderExists = await this.ordersService.findOne(id)
    if (!doesOrderExists) {
      throw new RecordNotFoundException()
    }
    /* Atualiza o campo método de pagamento com o valor recuperado do body da requisição */
    await this.ordersService.update(id, { payment_method: body.payment_method })
  }
}
