import { CurrentUser } from '@core/decorators'
import { MealIsNotAvailableException } from '@exceptions/meal-is-not-available.exception'
import { RecordNotFoundException } from '@exceptions/record-not-found.exception'
import { Body, Controller, Post } from '@nestjs/common'
import { User } from 'src/auth/users/entities/user.entity'
import { MealService } from 'src/meal/meal.service'
import { CreateOrderRequestBody } from '../dto/create-order-request-body'
import { OrdersService } from '../orders.service'

@Controller('orders')
export class PlaceOrderController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly mealsService: MealService,
  ) {}

  @Post()
  async execute(
    @Body() body: CreateOrderRequestBody,
    @CurrentUser() requester: User,
  ) {
    const doesMealExists = await this.mealsService.findOne(body.meal.id)
    if (!doesMealExists) {
      throw new RecordNotFoundException()
    }

    const { availability } = doesMealExists

    if (availability < 1) {
      throw new MealIsNotAvailableException()
    }

    const dto = { ...body, requester }
    return this.ordersService.create(dto)
  }
}
