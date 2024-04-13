import { Controller } from '@nestjs/common'
import { VoucherService } from './voucher.service'
import { Voucher } from './entities/voucher.entity'

@Controller('voucher')
export class VoucherController {}
