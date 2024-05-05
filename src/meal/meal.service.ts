import { MealNotFoundException } from '@exceptions/meal-not-found'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'
import { FindOptionsWhere, Repository } from 'typeorm'
import { CreateMealDto } from './dto/create-meal-dto'
import { Meal, MealShift } from './entities/meal.entity'

@Injectable()
export class MealService {
  constructor(@InjectRepository(Meal) private repository: Repository<Meal>) {}

  async create(createMealDto: CreateMealDto) {
    const meal = this.repository.create(createMealDto)
    return this.repository.save(meal)
  }

  async findAll(options: IPaginationOptions, date?: Date, shift?: MealShift) {
    const where: FindOptionsWhere<Meal> = {}
    // Da pra pesquisar por data ou turno, ou os dois juntos.
    if (date) {
      where.meal_date = date
    }
    if (shift) {
      where.shift = shift
    }
    return paginate<Meal>(this.repository, options, { where })
  }

  findOne(id: number) {
    return this.repository.findOneBy({
      id,
    })
  }

  async decrementDisponibility(mealId: number): Promise<void> {
    const meal = await this.repository.findOneBy({
      id: mealId,
    })

    if (!meal) {
      throw new MealNotFoundException()
    }

    meal.availability--
    await this.repository.update(mealId, { availability: meal.availability })
  }

  findOneByShiftAndDate({
    shift,
    meal_date,
  }: {
    shift: MealShift
    meal_date: Date
  }) {
    return this.repository.findOne({
      where: {
        shift,
        meal_date,
      },
    })
  }
  // findOne(id: number) {
  //   // Não é necessário especificar o id pois ele ja puxa do meal
  //   return `This action returns a #${id} meal`
  // }

  // update(id: number) {
  //   // Não é necessário especificar o id pois ele ja puxa do meal
  //   return `This action updates a #${id} meal`
  // }

  // remove(id: number) {
  //   // Não é necessário especificar o id pois ele ja puxa do meal
  //   return `This action removes a #${id} meal`
  // }
}
