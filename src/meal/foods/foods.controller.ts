import { RequiresRole } from '@core/decorators/requires-role.decorator'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { UserRole } from 'src/auth/users/types/user-role.enum'
import { CreateFoodDto } from './dto/create-food.dto'
import { UpdateFoodDto } from './dto/update-food.dto'
import { FoodsService } from './foods.service'

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) { }

  @Post()
  @RequiresRole(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodsService.create(createFoodDto)
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('search') search: string) {
    return this.foodsService.findAll({ page, limit: 10 }, search)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(+id)
  }

  @Patch(':id')
  @RequiresRole(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(+id, updateFoodDto)
  }

  @Delete(':id')
  @RequiresRole(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.foodsService.remove(+id)
  }
}
