import { randomBoolean } from '@core/utils/random-boolean'
import { PaymentAlreadyProcessedException } from '@exceptions/payment-already-processed.exception'
import { RecordNotFoundException } from '@exceptions/record-not-found.exception'
import { Controller, Param, Patch } from '@nestjs/common'
import { MealService } from 'src/meal/meal.service'
import { OrderState } from 'src/orders/entities/order.entity'
import { OrdersService } from 'src/orders/orders.service'
import { VoucherService } from 'src/voucher/voucher.service'
import { OrderPaymentState } from '../entities/order-payment.entity'
import { PaymentService } from '../payment.service'


@Controller('payment')
export class ProcessPaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrdersService,
    private readonly voucherService: VoucherService,
    private readonly mealService: MealService,
  ) {}

  @Patch(':id/process') // Processar o pagamento
  async process(@Param('id') id: number) {
    /* Verficar se o pagamento existe, se não existir retorna uma exceção */
    const doesPaymentExists = await this.paymentService.findOneById(id)
    if (!doesPaymentExists) {
      throw new RecordNotFoundException()
    }

    /* Verfica se o pagamento está pendente, se não estiver retorna uma exceção, não deve ser posível processar um pagamento mais de uma vez */
    const paymentIsNotPending =
      doesPaymentExists.state !== OrderPaymentState.PENDING
    console.log(doesPaymentExists)
    if (paymentIsNotPending) {
      throw new PaymentAlreadyProcessedException()
    }

    /* Gera um valor booleano aleatório e atualiza o estado do pagamento e do pedido de acordo com esse boolean */
    const APPROVED = randomBoolean()
    const { order } = doesPaymentExists
    if (APPROVED) {
      await this.paymentService.approve(id)

      await this.mealService.decrementDisponibility(order.meal.id) // acessamos o ID a partir do meal pois já há um ID atrelado ao meal, entao somente acessar ele.

      await this.orderService.update(order.id, {
        state: OrderState.APPROVED,
      })
      // Criando o voucher 
      const voucher = await this.voucherService.create({
        order,
      })

      return { message: 'Approved', voucher }
    } else {
      await this.paymentService.reject(id)
      await this.orderService.update(order.id, {
        state: OrderState.REJECTED,
      })
      return { message: 'Rejected' }
    }
  }
}
