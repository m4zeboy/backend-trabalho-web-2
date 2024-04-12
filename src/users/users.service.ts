import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    /* DTO - Data Transfer Object */
    const user = new User()
    user.name =
      createUserDto.name /* Manualmente inserindo os valores no usuario ja que o constructor nao adiciona automaticamente quando criado um novo usuario */
    user.email = createUserDto.email
    user.cpf = createUserDto.cpf
    user.password = createUserDto.password
    user.role = createUserDto.role

    return this.repository.save(user)
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
