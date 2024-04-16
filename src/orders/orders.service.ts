import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order-dto';
import { UpdateOrderDto } from './dto/update-order-dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';



@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Order) private repository: Repository<Order>) {}

    async create(CreateOrderDto: CreateOrderDto) {
        const order = new Order()
        order.requester = CreateOrderDto.requester
        order.requested_at = CreateOrderDto.requested_at
        order.state = CreateOrderDto.state
        order.meal_id = CreateOrderDto.meal_id
        order.total_price = CreateOrderDto.total_price

        return this.repository.save(order)
    }

    async FindAll(options: IPaginationOptions, requester?: string){
        const where: FindOptionsWhere<Order> = {}
        if(requester) {
            where.requester = ILike(`%${requester}`)
        }
        return paginate(this.repository, options, { where })
    }

    findOne(id: number) {
        return `This action returns a #${id} order`
      }
    
    update(id: number, updateFoodDto: UpdateOrderDto) {
        return `This action updates a #${id} order`
      }
    
    remove(id: number) {
        return `This action removes a #${id} order`
      }
}
