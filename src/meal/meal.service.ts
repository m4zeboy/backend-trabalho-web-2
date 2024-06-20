import { MealNotFoundException } from '@exceptions/meal-not-found'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'
import { FindOptionsWhere, Repository } from 'typeorm'
import { CreateMealDto } from './dto/create-meal-dto'
import { UpdateMealDto } from './dto/update-meal-dto'
import { Meal, MealShift } from './entities/meal.entity'

@Injectable()
export class MealService {
  constructor(@InjectRepository(Meal) private repository: Repository<Meal>) { }

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

  update(id: number, updateMealDto: UpdateMealDto) {
    // Não é necessário especificar o id pois ele ja puxa do meal
    return this.repository.update(id, updateMealDto)
  }

  // remove(id: number) {
  //   // Não é necessário especificar o id pois ele ja puxa do meal
  //   return `This action removes a #${id} meal`
  // }

  isCurrentDateTheSameAsMealDate(mealDate: string | Date): boolean {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    // Função para converter uma data para uma string no formato 'yyyy-MM-dd' considerando o fuso horário
    const formatDateToTimezone = (date: Date, timeZone: string): string => {
      const formatter = new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone,
      })
      return formatter.format(date).replace(/\//g, '-')
    }

    const mealDateString = mealDate

    const currentDate = new Date()
    const currentDateString = formatDateToTimezone(currentDate, timeZone)

    console.log('Current Date String:', currentDateString)
    console.log('Meal Date String:', mealDateString)

    return currentDateString === mealDateString
  }
}
