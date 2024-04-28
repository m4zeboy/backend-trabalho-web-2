import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderRequestBody } from './dto/create-order-request-body'
import { CurrentUser } from '@core/decorators'
import { User } from 'src/auth/users/entities/user.entity'
import { MealService } from 'src/meal/meal.service'
import { RecordNotFoundException } from '@exceptions/record-not-found.exception'

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService, private readonly mealsService: MealService) {}

  @Post()
  async create(@Body() body: CreateOrderRequestBody, @CurrentUser() requester: User) {
    const doesMealExists = await this.mealsService.findOne(body.meal.id)
    if(!doesMealExists) {
      throw new RecordNotFoundException()
    }
    const dto = { ...body, requester}
    return this.ordersService.create(dto)
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('requester') requester: string,
  ) {
    return this.ordersService.findAll({ page, limit: 10 }, requester)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ordersService.findOne(+id)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() UpdateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, UpdateOrderDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id)
  // }
}
