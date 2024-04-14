import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
// import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { FindOptionsWhere, ILike, Repository } from 'typeorm'
import { UserAlreadyExistsException } from '@exceptions/user-already-exists.exception'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'
import { RecordNotFoundException } from '@exceptions/record-not-found.exception'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    /* DTO - Data Transfer Object */
    const doesUserAlreadyExists = await this.repository.findOneBy({
      cpf: createUserDto.cpf,
    })

    if (doesUserAlreadyExists) {
      throw new UserAlreadyExistsException()
    }

    const created = this.repository.create(createUserDto)

    // user.name =
    //   createUserDto.name /* Manualmente inserindo os valores no usuario ja que o constructor nao adiciona automaticamente quando criado um novo usuario */
    // user.email = createUserDto.email
    // user.cpf = createUserDto.cpf
    // user.password = createUserDto.password
    // user.role = createUserDto.role

    const user = await this.repository.save(created)
    delete user.password
    return user
  }

  findAll(options: IPaginationOptions, search?: string) {
    const where: FindOptionsWhere<User> = {}
    if (search) {
      where.name = ILike(`%${search}%`)
    }
    return paginate(this.repository, options, { where })
  }

  async findByEmail(
    email: string,
    includePassowrd: boolean = false,
  ): Promise<User> {
    const user = await this.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne()

    if (includePassowrd) {
      return user
    }
    delete user.password
    return user
  }

  async findOne(id: number) {
    const user = await this.repository.findOneBy({
      id,
    })
    if (!user) {
      throw new RecordNotFoundException()
    }
    return user
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`
  // }
}
