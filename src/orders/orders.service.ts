import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order-dto'
import { Order } from './entities/order.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, ILike, Repository } from 'typeorm'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private repository: Repository<Order>) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = this.repository.create(createOrderDto)
    return this.repository.save(order)
  }

  async findAll(options: IPaginationOptions, requester?: string) {
    const where: FindOptionsWhere<Order> = {}
    if (requester) {
      where.requester = ILike(`%${requester}`)
    }
    return paginate(this.repository, options, { where })
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`
  // }

  // update(id: number, updateFoodDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`
  // }
}
