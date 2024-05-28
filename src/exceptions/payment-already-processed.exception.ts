import { HttpException, HttpStatus } from '@nestjs/common'

export class PaymentAlreadyProcessedException extends HttpException {
  constructor() {
    super('The payment was already approved or rejected.', HttpStatus.CONFLICT)
  }
}
