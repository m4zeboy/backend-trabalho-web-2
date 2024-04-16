import { Controller, Get, Post, Body, Patch, Param, Delete, Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order-dto';
import { UpdateOrderDto } from './dto/update-order-dto';


@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    create(@Body() CreateOrderDto: CreateOrderDto){
        return this.ordersService.create(CreateOrderDto)
    }

    @Get()
    findAll(@Query('page') page: number = 1, @Query('requester') requester: string){
        return this.ordersService.FindAll({page, limit: 10}, requester)
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.ordersService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() UpdateOrderDto: UpdateOrderDto){
        return this.ordersService.update(+id, UpdateOrderDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.ordersService.remove(+id)
    }

}
