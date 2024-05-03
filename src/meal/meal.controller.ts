import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common'
import { MealService } from './meal.service'
import { CreateMealDto } from './dto/create-meal-dto'
import { UserRole } from 'src/auth/users/types/user-role.enum'
import { RequiresRole } from '@core/decorators/requires-role.decorator'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { Meal, MealShift } from './entities/meal.entity'
import { MealAlreadyExistsException } from '@exceptions/meal-already-exists'

@Controller('meal')
export class MealController {
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

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('date') date?: Date,
    @Query('shift') shift?: MealShift,
  ) {
    return this.mealService.findAll({ page, limit: 10 }, date, shift)
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.mealService.findOne(+id)
  // }

  /* @Patch(':id')
    update(@Param('id') id: number, @Body() UpdateMealDto: UpdateMealDto){
        return this.mealService.update(+id, UpdateMealDto)
    } */

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.mealService.remove(+id)
  // }
}
