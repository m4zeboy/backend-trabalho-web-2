import { Controller, Get, Param } from '@nestjs/common'
import { PaymentService } from '../payment.service'

@Controller('payment')
export class GetPaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get(':id')
  async execute(@Param('id') id: number) {
    return this.paymentService.findOneById(id)
  }
}
