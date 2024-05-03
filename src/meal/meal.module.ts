import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Meal } from './entities/meal.entity'
import { MealController } from './meal.controller'
import { MealService } from './meal.service'

@Module({
  imports: [TypeOrmModule.forFeature([Meal])],
  providers: [MealService],
  controllers: [MealController],
  exports: [MealService],
})
export class MealModule {}
