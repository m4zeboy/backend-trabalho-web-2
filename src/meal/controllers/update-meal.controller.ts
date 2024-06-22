import { RequiresRole } from '@core/decorators/requires-role.decorator'
import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { UserRole } from 'src/auth/users/types/user-role.enum'
import { UpdateMealDto } from '../dto/update-meal-dto'
import { MealService } from '../meal.service'

@Controller('meal')
export class UpdateMealController {
  constructor(private readonly mealService: MealService) {}

  @Patch(':id')
  @RequiresRole(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async execute(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    try {
      const response = await this.mealService.update(+id, updateMealDto)
      return response
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
