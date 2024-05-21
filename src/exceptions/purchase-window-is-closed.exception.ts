import { HttpException, HttpStatus } from '@nestjs/common'

export class PurchaseWindowIsClosedException extends HttpException {
  constructor() {
    super(
      'The pruchase window is closed. It is not possible to place order.',
      HttpStatus.FORBIDDEN,
    )
  }
}
