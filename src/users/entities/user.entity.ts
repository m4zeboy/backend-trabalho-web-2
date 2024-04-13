import { BaseEntity } from '@core/entities'
import { BeforeInsert, Column, Entity } from 'typeorm'
import { UserRole } from '../types/user-role.enum'
import { hashSync } from 'bcrypt'

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

  @BeforeInsert()
  encryptPassword() {
    this.password = hashSync(this.password, 8)
  }

  constructor() {}
}
