import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MealModule } from 'src/meal/meal.module'
import { ListOrdersController } from './controllers/list-orders.controller'
import { PlaceOrderController } from './controllers/place-order.controller'
import { SetOrderPaymentMethodController } from './controllers/set-order-payment-method.controller'
import { Order } from './entities/order.entity'
import { OrdersService } from './orders.service'

@Module({
  imports: [TypeOrmModule.forFeature([Order]), MealModule],
  providers: [OrdersService],
  controllers: [
    PlaceOrderController,
    ListOrdersController,
    SetOrderPaymentMethodController,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
