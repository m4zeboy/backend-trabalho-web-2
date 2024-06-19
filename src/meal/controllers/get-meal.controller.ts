import { Controller, Get, Param } from '@nestjs/common'
import { MealService } from '../meal.service'

@Controller('meal')
export class GetMealController {
  constructor(private readonly mealService: MealService) { }

  @Get(':id')
  execute(@Param('id') id: number = -1) {
    return this.mealService.findOne(id)
  }
}
