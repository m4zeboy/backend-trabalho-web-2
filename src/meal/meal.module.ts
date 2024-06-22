import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CreateMealController } from './controllers/create-meal.controller'
import { GetMealController } from './controllers/get-meal.controller'
import { ListMealsController } from './controllers/list-meals.controller'
import { UpdateMealController } from './controllers/update-meal.controller'
import { Meal } from './entities/meal.entity'
import { MealService } from './meal.service'

@Module({
  imports: [TypeOrmModule.forFeature([Meal])],
  providers: [MealService],
  controllers: [
    CreateMealController,
    ListMealsController,
    GetMealController,
    UpdateMealController,
  ],
  exports: [MealService],
})
export class MealModule { }
