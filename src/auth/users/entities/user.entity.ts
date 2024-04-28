import { BaseEntity } from '@core/entities'
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm'
import { UserRole } from '../types/user-role.enum'
import { hashSync } from 'bcrypt'
import { Order } from 'src/orders/entities/order.entity'

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
    select: false,
  })
  public password: string

  @Column({
    enum: ['STUDENT', 'ADMIN'],
    default: 'STUDENT',
  })
  public role: UserRole

  @OneToMany(() => Order, (order) => order.requester)
  public orders: Order[]

  @BeforeInsert()
  encryptPassword() {
    this.password = hashSync(this.password, 8)
  }
}
