import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { randomUUID } from 'crypto'
import { Repository } from 'typeorm'
import { CreateCreditCardPaymentDto } from './dto/create-credit-card-payment.dto'
import { CreatePixPaymentDto } from './dto/create-pix-payment.dto'
import { CreditCardPayment } from './entities/credit-card-payment.entity'
import {
  OrderPayment,
  OrderPaymentState,
} from './entities/order-payment.entity'
import { PixPayment } from './entities/pix-payment.entity'

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(OrderPayment)
    private orderPaymentRepository: Repository<OrderPayment> /* Repositório da super classe */,
    @InjectRepository(CreditCardPayment)
    private creditCardPaymentRepository: Repository<CreditCardPayment> /* Repositório da sub class de cartão de crédito */,
    @InjectRepository(PixPayment)
    private pixPaymentRepository: Repository<PixPayment> /* Repositório da sub class de cartão de crédito */,
  ) {}

  /* Cria um pagamento com cartão de crédito */
  async createCreditCard(
    createCreditCardPaymentDto: CreateCreditCardPaymentDto,
  ) {
    const creditCardPayment = this.creditCardPaymentRepository.create(
      createCreditCardPaymentDto,
    )
    const created =
      await this.creditCardPaymentRepository.save(creditCardPayment)
    return created
  }

  async createPixCode(createPixPaymentDto: CreatePixPaymentDto) {
    const pixPayment = this.pixPaymentRepository.create({
      pix_code: randomUUID(),
      order: createPixPaymentDto.order,
    })
    const created = await this.pixPaymentRepository.save(pixPayment)
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
      closed_at: new Date(),
    })
  }

  /* Rejeita um pagamento */
  reject(id: number) {
    return this.orderPaymentRepository.update(id, {
      state: OrderPaymentState.REJECTED,
      closed_at: new Date(),
    })
  }
}
