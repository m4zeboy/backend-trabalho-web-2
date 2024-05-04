import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrdersModule } from 'src/orders/orders.module'
import { CreditCardPayment } from './entities/credit-card-payment.entity'
import { OrderPayment } from './entities/order-payment.entity'
import { PixPayment } from './entities/pix-payment.entity'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { MealModule } from 'src/meal/meal.module'

/* Módulo único de pagamentos, vai gerenciar tanto pagamento com cartão de crédito assim como pix */
@Module({
  imports: [
    TypeOrmModule.forFeature([OrderPayment, CreditCardPayment, PixPayment]),
    OrdersModule, MealModule,
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
