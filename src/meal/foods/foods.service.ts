import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'
import { FindOptionsWhere, ILike, Repository } from 'typeorm'
import { CreateFoodDto } from './dto/create-food.dto'
import { UpdateFoodDto } from './dto/update-food.dto'
import { Food } from './entities/food.entity'

@Injectable()
export class FoodsService {
  constructor(@InjectRepository(Food) private repository: Repository<Food>) {}

  create(createFoodDto: CreateFoodDto) {
    const food = this.repository.create(createFoodDto)
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
