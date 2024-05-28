import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'
import { FindOptionsWhere, ILike, Repository } from 'typeorm'
import { CreateOrderDto } from './dto/create-order-dto'
import { UpdateOrderDto } from './dto/update-order-dto'
import { Order } from './entities/order.entity'

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private repository: Repository<Order>) {}

  create(createOrderDto: CreateOrderDto) {
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

  findOne(id: number) {
    return this.repository.findOneBy({
      id,
    })
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.repository.update(id, updateOrderDto)
  }

  findOneByRequester(requesterId: number) {
    return this.repository.findOneBy({
      requester: {
        id: requesterId
      }
    })
  }

  // remove(id: number) {
  //   return `This action removes a #${id} order`
  // }
}
