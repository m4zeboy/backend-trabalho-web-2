import { Controller, Get, Query } from '@nestjs/common'
import { OrdersService } from '../orders.service'

@Controller('orders')
export class ListOrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  execute(
    @Query('page') page: number = 1,
    @Query('requester') requester: string,
  ) {
    return this.ordersService.findAll({ page, limit: 10 }, requester)
  }
}
