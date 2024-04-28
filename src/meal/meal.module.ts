import { Module } from '@nestjs/common'
import { MealService } from './meal.service'
import { MealController } from './meal.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Meal } from './entities/meal.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Meal])],
  providers: [MealService],
  controllers: [MealController],
  exports: [MealService]
})
export class MealModule {}
