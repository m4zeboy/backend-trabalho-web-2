import { BaseEntity } from '@core/entities'
import { Column, Entity } from 'typeorm'
import { UserRole } from '../types/user-role.enum'

@Entity()
export class User extends BaseEntity {
  @Column({
    length: 100,
  })
  public name: string

  @Column({
    length: 11,
    unique: true,
  })
  public cpf: string

  @Column({
    length: 255,
  })
  public email: string

  @Column({
    length: 255,
  })
  public password: string

  @Column({
    enum: ['STUDENT', 'ADMIN'],
    default: 'STUDENT',
  })
  public role: UserRole
}
