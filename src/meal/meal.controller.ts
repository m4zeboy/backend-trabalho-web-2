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

@Controller('meal')
export class MealController {
  // definindo o construtor da classe e declarando o parametro private.
  // modificando o acesso para somente dentro da classe.
  constructor(private readonly mealService: MealService) {}

  @Post()
  @RequiresRole(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  create(@Body() createMealDto: CreateMealDto) {
    return this.mealService.create(createMealDto)
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('date') date: Date,
    @Query('shift') shift: MealShift = MealShift.LUNCH,
  ) {
    return this.mealService.findAll({ page, limit: 10 }, date, shift)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.mealService.findOne(+id)
  }

  /* @Patch(':id')
    update(@Param('id') id: number, @Body() UpdateMealDto: UpdateMealDto){
        return this.mealService.update(+id, UpdateMealDto)
    } */

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.mealService.remove(+id)
  }
}
