import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { MealModule } from 'src/meal/meal.module'
import { MealService } from 'src/meal/meal.service'

@Module({
  imports: [TypeOrmModule.forFeature([Order]), MealModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
