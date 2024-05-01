import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCreditCardPaymentDto } from './dto/create-credit-card-payment.dto'
import { CreditCardPayment } from './entities/credit-card-payment.entity'
import {
  OrderPayment,
  OrderPaymentState,
} from './entities/order-payment.entity'

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(OrderPayment)
    private orderPaymentRepository: Repository<OrderPayment> /* Repositório da super classe */,
    @InjectRepository(CreditCardPayment)
    private crediCardPaymentRepository: Repository<CreditCardPayment> /* Repositório da sub class de cartão de crédito */,
  ) {}

  /* Cria um pagamento com cartão de crédito */
  async createCreditCard(
    createCreditCardPaymentDto: CreateCreditCardPaymentDto,
  ) {
    const creditCardPayment = this.crediCardPaymentRepository.create(
      createCreditCardPaymentDto,
    )
    const created =
      await this.crediCardPaymentRepository.save(creditCardPayment)
    return created
  }

  /* Busca se já existe um pagamento genérico vinculado a um pedido */
  async findOneByOrderId(orderId: number) {
    return await this.orderPaymentRepository.findOneBy({
      order: {
        id: orderId,
      },
    })
  }

  /* Busca por um pagamento genérico pelo id */
  async findOneById(id: number) {
    return await this.orderPaymentRepository.findOneBy({
      id,
    })
  }

  /* Aprova um pagamento */
  approve(id: number) {
    return this.orderPaymentRepository.update(id, {
      state: OrderPaymentState.APPROVED,
    })
  }

  /* Rejeita um pagamento */
  reject(id: number) {
    return this.orderPaymentRepository.update(id, {
      state: OrderPaymentState.REJECTED,
    })
  }
}
