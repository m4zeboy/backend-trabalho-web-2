import { HttpException, HttpStatus } from '@nestjs/common'

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super('User Already exists with this CPF.', HttpStatus.CONFLICT)
  }
}
