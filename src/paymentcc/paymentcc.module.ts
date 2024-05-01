import { Module } from '@nestjs/common'
import { PaymentccService } from './paymentcc.service'
import { PaymentccController } from './paymentcc.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PaymentCC } from './entities/paymentcc.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PaymentCC])],
  providers: [PaymentccService],
  controllers: [PaymentccController],
})
export class PaymentccModule {}
