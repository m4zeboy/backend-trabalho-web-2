import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MealModule } from 'src/meal/meal.module'
import { OrdersModule } from 'src/orders/orders.module'
import { VoucherModule } from 'src/voucher/voucher.module'
import { CreateCreditCardPaymentController } from './controllers/create-credit-card-payment.controller'
import { CreatePixPaymentController } from './controllers/create-pix-payment.controller'
import { GetPaymentController } from './controllers/get-payment.controller copy'
import { ProcessPaymentController } from './controllers/process-payment.controller'
import { CreditCardPayment } from './entities/credit-card-payment.entity'
import { OrderPayment } from './entities/order-payment.entity'
import { PixPayment } from './entities/pix-payment.entity'
import { PaymentService } from './payment.service'

/* Módulo único de pagamentos, vai gerenciar tanto pagamento com cartão de crédito assim como pix */
@Module({
  imports: [
    TypeOrmModule.forFeature([OrderPayment, CreditCardPayment, PixPayment]),
    OrdersModule,
    MealModule,
    VoucherModule,
  ],
  providers: [PaymentService],
  controllers: [
    CreateCreditCardPaymentController,
    ProcessPaymentController,
    CreatePixPaymentController,
    GetPaymentController,
  ],
})
export class PaymentModule {}
