import { randomBoolean } from '@core/utils/random-boolean'
import { RecordNotFoundException } from '@exceptions/record-not-found.exception'
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { OrderState } from 'src/orders/entities/order.entity'
import { OrdersService } from 'src/orders/orders.service'
import { CreateCreditCardPaymentDto } from './dto/create-credit-card-payment.dto'
import { OrderPaymentState } from './entities/order-payment.entity'
import { PaymentService } from './payment.service'

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrdersService,
  ) {}

  @Post(
    'credit-card',
  ) /* Define qual cartão de crédito será usado no pagamento desse pedido */
  async create(@Body() createCreditCardPaymentDto: CreateCreditCardPaymentDto) {
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

  @Patch(':id/process') // Processar o pagamento
  async process(@Param('id') id: number) {
    /* Verficar se o pagamento existe, se não exister retorna uma exceção */
    const doesPaymentExists = await this.paymentService.findOneById(id)
    if (!doesPaymentExists) {
      throw new RecordNotFoundException()
    }

    /* Verfica se o pagamento está pendente, se não estiver retorna uma exceção, não deve ser posível processar um pagamento mais de uma vez */
    if (doesPaymentExists.state !== OrderPaymentState.PENDING) {
      throw new HttpException(
        'The payment was already approved or rejected.',
        HttpStatus.CONFLICT,
      )
    }

    /* Gera um valor booleano aleatório e atualiza o estado do pagamento e do pedido de acordo com esse boolean */
    const APPROVED = randomBoolean()
    const { order } = doesPaymentExists
    if (APPROVED) {
      await this.paymentService.approve(id)
      await this.orderService.update(order.id, {
        state: OrderState.APPROVED,
      })
      return { message: 'Approved' }
    } else {
      await this.paymentService.reject(id)
      await this.orderService.update(order.id, {
        state: OrderState.REJECTED,
      })
      return { message: 'Rejected' }
    }
  }
  // @Get()
  // findAll(
  //     @Query('page') page: number = 1,
  //     @Query('card_number') card_number: string,
  // ) {
  //     return this.PaymentccService.FindAll({page, limit: 10}, card_number)
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.PaymentccService.findOne(+id)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() UpdateCCDto: UpdateCCDto) {
  //   return this.PaymentccService.update(+id, UpdateCCDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.PaymentccService.remove(+id)
  // }
}
