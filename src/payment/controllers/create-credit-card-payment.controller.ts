import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { OrderState } from 'src/orders/entities/order.entity'
import { OrdersService } from 'src/orders/orders.service'
import { CreateCreditCardPaymentDto } from '../dto/create-credit-card-payment.dto'
import { PaymentService } from '../payment.service'

@Controller('payment')
export class CreateCreditCardPaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrdersService,
  ) {}

  @Post(
    'credit-card',
  ) /* Define qual cartão de crédito será usado no pagamento desse pedido */
  async execute(
    @Body() createCreditCardPaymentDto: CreateCreditCardPaymentDto,
  ) {
    /* Verifica se já existe um pagamento criado para esse pedido, se sim retorna uma exceção de conflito */
    const doesAlreadyExistsAPaymentForThisOrder =
      await this.paymentService.findOneByOrderId(
        createCreditCardPaymentDto.order.id,
      )
    if (doesAlreadyExistsAPaymentForThisOrder) {
      throw new HttpException(
        'There is already a payment for this order.',
        HttpStatus.CONFLICT,
      )
    }

    /* Cria o registro do pagamento com as informações do cartão de crédito */
    const payment = await this.paymentService.createCreditCard(
      createCreditCardPaymentDto,
    )

    /* Atualiza o estado do pedido para PENDING (pagamento pendente) */
    await this.orderService.update(createCreditCardPaymentDto.order.id, {
      state: OrderState.PENDING,
    })

    return payment
  }
}
