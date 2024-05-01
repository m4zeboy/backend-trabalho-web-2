import { Injectable } from '@nestjs/common'
import { PaymentCC } from './entities/paymentcc.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, ILike, Repository, Equal } from 'typeorm'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'
import { CreateCCDto } from './dto/create-cc-dto'
import { UpdateCCDto } from './dto/update-cc-dto'

@Injectable()
export class PaymentccService {
  constructor(
    @InjectRepository(PaymentCC) private repository: Repository<PaymentCC>,
  ) {}

  async create(CreateCCDto: CreateCCDto) {
    const paymentcc = new PaymentCC()
    paymentcc.card_number = CreateCCDto.card_number
    paymentcc.expiration_date = CreateCCDto.expiration_date
    paymentcc.security_code = CreateCCDto.security_code
    paymentcc.account_holder = CreateCCDto.account_holder

    return this.repository.save(paymentcc)
  }

  async FindAll(options: IPaginationOptions, card_number?: string) {
    const where: FindOptionsWhere<PaymentCC> = {}
    if (card_number) {
      where.card_number = ILike(`%${card_number}`)
    }
    return paginate(this.repository, options, { where })
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentcc`
  }

  update(id: number, UpdateCCDto: UpdateCCDto) {
    return `This action updates a #${id} paymentcc`
  }

  remove(id: number) {
    return `This action removes a #${id} paymentcc`
  }
}
