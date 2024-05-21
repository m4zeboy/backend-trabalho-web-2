import { HttpException, HttpStatus } from '@nestjs/common'

export class VoucherExpired extends HttpException {
  constructor() {
    super('Voucher Expired.', HttpStatus.CONFLICT)
  }
}
