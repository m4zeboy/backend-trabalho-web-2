import { Injectable } from '@nestjs/common';
import { CreateMealDto  } from './dto/create-meal-dto';
import { UpdateMealDto } from './dto/update-meal-dto';
import { Meal } from './entities/meal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'


@Injectable()
export class MealService {
    constructor(@InjectRepository(Meal) private repository: Repository<Meal>) {}

    async create(CreateMealDto: CreateMealDto){
        const meal = new Meal()
        meal.meal_date = CreateMealDto.meal_date
        meal.shift = CreateMealDto.shift
        meal.price = CreateMealDto.price
        meal.availability = CreateMealDto.availability
        return this.repository.save(Meal)
    }

    async findAll(options: IPaginationOptions, date?: Date, shift?: string){
        const where: FindOptionsWhere<Meal> = {} 
        //Da pra pesquisar por data ou turno, ou os dois juntos.
        if(date) {
            where.meal_date = date;
        }
        if(shift) {
            where.shift = shift;
        }
        return paginate<Meal>(this.repository, options, { where })
    }

    findOne(id: number) { // Não é necessário especificar o id pois ele ja puxa do meal
        return `This action returns a #${id} meal`
    }

    update(id: number) { // Não é necessário especificar o id pois ele ja puxa do meal
        return `This action updates a #${id} meal`
    }

    remove(id: number) { // Não é necessário especificar o id pois ele ja puxa do meal
        return `This action removes a #${id} meal`
    }
}
