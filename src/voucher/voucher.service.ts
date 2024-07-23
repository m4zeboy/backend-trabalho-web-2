import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'
import {
  Repository,
  Between,
  FindOptionsWhere,
  FindOptionsOrder,
} from 'typeorm'
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

  async findAll(
    options: IPaginationOptions,
    query?: {
      user_id?: number
      order_by?: keyof typeof Voucher
      order_by_direction?: 'ASC' | 'DESC'
    },
  ) {
    const where: FindOptionsWhere<Voucher> = {}
    const order: FindOptionsOrder<Voucher> = {}

    if (query?.user_id) {
      where.order = {
        requester: {
          id: query.user_id,
        },
      }
    }

    if (query?.order_by) {
      order[query.order_by] = query.order_by_direction || 'DESC'
    }

    return paginate(this.repository, options, { where, order })
  }

  async updateValidatedAt(voucherId: number, validatedAt: Date) {
    return await this.repository.update(voucherId, {
      validated_at: validatedAt,
    })
  }

  async findOneById(id: number): Promise<Voucher | null> {
    return await this.repository.findOne({ where: { id } })
  }

  async validateVoucher(voucherId: number) {
    const voucher = await this.repository.findOneBy({ id: voucherId })

    if (!voucher) {
      throw new Error('Voucher not found')
    }
    return await this.updateValidatedAt(voucher.id, new Date())
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id })
  }

  remove(id: number) {
    return `This action removes a #${id} voucher`
  }

  async findVouchersByDate(date: string, options: IPaginationOptions) {
    const startDate = new Date(date)
    const endDate = new Date(date)
    endDate.setDate(startDate.getDate() + 1)

    return paginate(this.repository, options, {
      where: {
        createdAt: Between(startDate, endDate),
      },
    })
  }
}
