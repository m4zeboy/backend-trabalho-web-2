import { HttpException, HttpStatus } from '@nestjs/common'

export class MealNotFoundException extends HttpException {
  constructor() {
    super('Meal not found.', HttpStatus.NOT_FOUND)
  }
}
