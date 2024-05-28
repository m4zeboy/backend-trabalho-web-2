import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  Query,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { IsPublic } from '@core/decorators'
// import { UpdateUserDto } from './dto/update-user.dto'
import { BadRequestException } from '@nestjs/common'
import { cpf } from 'cpf-cnpj-validator' // Import as cpfValidator to avoid confusion

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const isValidCPF = cpf.isValid(createUserDto.cpf)
    if (!isValidCPF) {
      throw new BadRequestException('Invalid CPF')
    }

    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll(@Query('page') page: number, @Query('search') search: string) {
    return this.usersService.findAll({ page, limit: 10 }, search)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id)
  // }
}
