import { Controller, Get, Query } from '@nestjs/common'
import { MealShift } from '../entities/meal.entity'
import { MealService } from '../meal.service'

@Controller('meal')
export class ListMealsController {
  constructor(private readonly mealService: MealService) {}

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('date') date?: Date,
    @Query('shift') shift?: MealShift,
    @Query('order_by') order_by?: string,
  ) {
    return this.mealService.findAll({ page, limit: 10 }, date, shift, order_by)
  }
}
