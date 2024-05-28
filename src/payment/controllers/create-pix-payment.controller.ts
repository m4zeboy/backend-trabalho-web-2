import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { OrderState } from 'src/orders/entities/order.entity'
import { OrdersService } from 'src/orders/orders.service'
import { CreatePixPaymentDto } from '../dto/create-pix-payment.dto'
import { PaymentService } from '../payment.service'

@Controller('payment')
export class CreatePixPaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrdersService,
  ) {}

  @Post('pix')
  async execute(@Body() createPixPaymentDto: CreatePixPaymentDto) {
    /* Verifica se já existe um pagamento criado para esse pedido, se sim retorna uma exceção de conflito */
    const doesAlreadyExistsAPaymentForThisOrder =
      await this.paymentService.findOneByOrderId(createPixPaymentDto.order.id)
    if (doesAlreadyExistsAPaymentForThisOrder) {
      throw new HttpException(
        'There is already a payment for this order.',
        HttpStatus.CONFLICT,
      )
    }

    /* Cria um código pix */
    const payment = await this.paymentService.createPixCode(createPixPaymentDto)

    /* Atualiza o estado do pedido para PENDING (pagamento pendente) */
    await this.orderService.update(createPixPaymentDto.order.id, {
      state: OrderState.PENDING,
    })

    return payment
  }
}
