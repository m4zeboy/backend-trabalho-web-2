import { CurrentUser } from '@core/decorators'
import { RecordNotFoundException } from '@exceptions/record-not-found.exception'
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { User } from 'src/auth/users/entities/user.entity'
import { MealService } from 'src/meal/meal.service'
import { CreateOrderRequestBody } from './dto/create-order-request-body'
import { UpdateOrderDto } from './dto/update-order-dto'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly mealsService: MealService,
  ) {}

  @Post()
  async create(
    @Body() body: CreateOrderRequestBody,
    @CurrentUser() requester: User,
  ) {
    const doesMealExists = await this.mealsService.findOne(body.meal.id)
    if (!doesMealExists) {
      throw new RecordNotFoundException()
    }
    const dto = { ...body, requester }
    return this.ordersService.create(dto)
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('requester') requester: string,
  ) {
    return this.ordersService.findAll({ page, limit: 10 }, requester)
  }

  @Patch(':id/payment')
  async setPaymentMethod(
    @Param('id') id: number,
    @Body() body: UpdateOrderDto,
  ) {
    const doesOrderExists = await this.ordersService.findOne(id)
    if (!doesOrderExists) {
      throw new RecordNotFoundException()
    }
    await this.ordersService.update(id, { payment_method: body.payment_method })
    return doesOrderExists
  }
}
