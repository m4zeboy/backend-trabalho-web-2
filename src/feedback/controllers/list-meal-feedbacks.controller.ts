import { Controller, Get, Param, Query } from '@nestjs/common'
import { FeedbackService } from '../feedback.service'

@Controller('feedback')
export class ListMealFeedbacksController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('/:meal_id')
  execute(@Param('meal_id') mealId: number, @Query('page') page: number = 1) {
    return this.feedbackService.listByMealId({ page, limit: 10 }, mealId)
  }
}
