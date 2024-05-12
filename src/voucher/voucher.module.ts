import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Voucher } from './entities/voucher.entity'
import { VoucherController } from './voucher.controller'
import { VoucherService } from './voucher.service'
import { ValidateVoucherController } from './controllers/validate-voucher.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Voucher])],
  providers: [VoucherService],
  controllers: [VoucherController, ValidateVoucherController],
  exports: [VoucherService],
})
export class VoucherModule {}
