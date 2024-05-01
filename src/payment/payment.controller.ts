import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { OrdersService } from 'src/orders/orders.service'
import { CreateCreditCardPaymentDto } from './dto/create-credit-card-payment.dto'
import { PaymentService } from './payment.service'

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrdersService,
  ) {}

  @Post('credit-card')
  async create(@Body() createCreditCardPaymentDto: CreateCreditCardPaymentDto) {
    const doesAlreadyExistsAPaymentForThisOrder =
      await this.paymentService.findOneByOrderId(
        createCreditCardPaymentDto.order.id,
      )
    if (doesAlreadyExistsAPaymentForThisOrder) {
      throw new HttpException(
        'There is already a payment for this order.',
        HttpStatus.CONFLICT,
      )
    }

    const payment = await this.paymentService.createCreditCard(
      createCreditCardPaymentDto,
    )

    return payment
  }

  // @Get()
  // findAll(
  //     @Query('page') page: number = 1,
  //     @Query('card_number') card_number: string,
  // ) {
  //     return this.PaymentccService.FindAll({page, limit: 10}, card_number)
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.PaymentccService.findOne(+id)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() UpdateCCDto: UpdateCCDto) {
  //   return this.PaymentccService.update(+id, UpdateCCDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.PaymentccService.remove(+id)
  // }
}
