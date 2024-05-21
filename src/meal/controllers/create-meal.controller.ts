import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { UserRole } from 'src/auth/users/types/user-role.enum'
import { RequiresRole } from '@core/decorators/requires-role.decorator'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { MealAlreadyExistsException } from '@exceptions/meal-already-exists'
import { MealService } from '../meal.service'
import { CreateMealDto } from '../dto/create-meal-dto'

@Controller('meal')
export class CreateMealController {
  // definindo o construtor da classe e declarando o parametro private.
  // modificando o acesso para somente dentro da classe.
  constructor(private readonly mealService: MealService) {}

  @Post()
  @RequiresRole(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async create(@Body() createMealDto: CreateMealDto) {
    // buscar se existe uma refeição nesse turno e nessa data
    const { meal_date, shift } = createMealDto
    const IsThereAlreadyAMealWithSameShiftAndDate =
      await this.mealService.findOneByShiftAndDate({
        shift,
        meal_date,
      })
    if (IsThereAlreadyAMealWithSameShiftAndDate) {
      throw new MealAlreadyExistsException()
    }
    return this.mealService.create(createMealDto)
  }
}
