import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal-dto';
import { UpdateMealDto } from './dto/update-meal-dto';

@Controller('meal')
export class MealController {
    //definindo o construtor da classe e declarando o parametro private. 
    // modificando o acesso para somente dentro da classe.
    constructor (private readonly mealService: MealService) {}

    @Post()
    create(@Body () CreateMealDto: CreateMealDto){
        return this.mealService.create(CreateMealDto)
    }

    @Get()
    findAll(@Query('page') page: number = 1, @Query('date') date: Date, @Query('shift') shift: string) {
        return this.mealService.findAll({page, limit: 10}, date, shift)
    }

    @Get(':id')
    findOne(@Param('id') id: number){
        return this.mealService.findOne(+id)
    }

    /*@Patch(':id')
    update(@Param('id') id: number, @Body() UpdateMealDto: UpdateMealDto){
        return this.mealService.update(+id, UpdateMealDto)
    }*/

    @Delete(':id')
    remove(@Param('id') id: number){
        return this.mealService.remove(+id)
    }

}
