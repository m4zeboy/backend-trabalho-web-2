import { HttpException, HttpStatus } from '@nestjs/common'

export class MealIsNotAvailableException extends HttpException {
  constructor() {
    super('The meal is not available.', HttpStatus.NOT_FOUND)
  }
}
