import { Injectable } from '@nestjs/common'
import { CreateVoucherDto } from './dto/create-voucher.dto'
import { Voucher } from './entities/voucher.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, ILike, Repository, Equal } from 'typeorm'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher) private repository: Repository<Voucher>,
  ) {}

  async create(CreateVoucherDto: CreateVoucherDto) {
    const voucher = new Voucher()
    voucher.order_id = CreateVoucherDto.order_id
    voucher.expires_in = CreateVoucherDto.expires_in

    return this.repository.save(voucher)
  }

  async findAll(options: IPaginationOptions, order_id?: number) {
    const where: FindOptionsWhere<Voucher> = {}
    if (order_id) {
      where.order_id = Equal(order_id)
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
