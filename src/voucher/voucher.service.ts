import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'
import { FindOptionsWhere, Repository } from 'typeorm'
import { CreateVoucherDto } from './dto/create-voucher.dto'
import { Voucher } from './entities/voucher.entity'

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher) private repository: Repository<Voucher>,
  ) {}

  create(createVoucherDto: CreateVoucherDto) {
    const voucher = this.repository.create(createVoucherDto)
    return this.repository.save(voucher)
  }

  async findAll(options: IPaginationOptions, order_id?: number) {
    const where: FindOptionsWhere<Voucher> = {}
    if (order_id) {
      where.order = {
        id: order_id,
      }
    } // confirmar esse equal depois, não tenho certeza.
    return paginate(this.repository, options, { where })
  }

  findOne(id: number) {
    return `This action returns a #${id} voucher`
  }

  update(id: number) {
    return `This action updates a #${id} voucher`
  }

  remove(id: number) {
    return `This action removes a #${id} voucher`
  }
}
