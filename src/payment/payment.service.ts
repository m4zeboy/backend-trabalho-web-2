import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCreditCardPaymentDto } from './dto/create-credit-card-payment.dto'
import { CreditCardPayment } from './entities/credit-card-payment.entity'
import { OrderPayment } from './entities/order-payment.entity'

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(CreditCardPayment)
    private crediCardPaymentRepository: Repository<CreditCardPayment>,
    @InjectRepository(OrderPayment)
    private orderPaymentRepository: Repository<OrderPayment>,
  ) {}

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

  async findOneByOrderId(orderId: number) {
    return await this.orderPaymentRepository.findOneBy({
      order: {
        id: orderId,
      },
    })
  }
}
