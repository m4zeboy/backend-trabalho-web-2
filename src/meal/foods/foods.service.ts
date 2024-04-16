import { Injectable } from '@nestjs/common'
import { CreateFoodDto } from './dto/create-food.dto'
import { UpdateFoodDto } from './dto/update-food.dto'
import { Food } from './entities/food.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, ILike, Repository } from 'typeorm'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'

@Injectable()
export class FoodsService {
  constructor(@InjectRepository(Food) private repository: Repository<Food>) {}

  async create(createFoodDto: CreateFoodDto) {
    const food = new Food()
    food.name = createFoodDto.name
    food.portion = createFoodDto.portion
    food.calories = createFoodDto.calories
    return this.repository.save(food)
  }

  async findAll(options: IPaginationOptions, search?: string) {
    const where: FindOptionsWhere<Food> = {}
    if (search) {
      where.name = ILike(`%${search}%`)
    }
    return paginate(this.repository, options, { where })
  }

  findOne(id: number) {
    return `This action returns a #${id} food`
  }

  update(id: number, updateFoodDto: UpdateFoodDto) {
    return `This action updates a #${id} food`
  }

  remove(id: number) {
    return `This action removes a #${id} food`
  }
}
