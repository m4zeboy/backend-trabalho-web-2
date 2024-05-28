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
    }
    return paginate(this.repository, options, { where })
  }

  async updateValidatedAt(voucherId: number, validatedAt: Date) {
    return await this.repository.update(voucherId, {
      validated_at: validatedAt,
    })
  }

  async findOneById(id: number): Promise<Voucher | null> {
    /* Tem o Null pois ele pode retornar um valor nulo (quando não achar o voucher) */
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
    return `This action returns a #${id} voucher`
  }

  update(id: number) {
    return `This action updates a #${id} voucher`
  }

  remove(id: number) {
    return `This action removes a #${id} voucher`
  }
}
