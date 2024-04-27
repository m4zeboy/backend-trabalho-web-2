import { HttpException, HttpStatus } from '@nestjs/common'

export class MealAlreadyExistsException extends HttpException {
  constructor() {
    super('There is already a meal with same date and shift.', HttpStatus.CONFLICT)
  }
}
