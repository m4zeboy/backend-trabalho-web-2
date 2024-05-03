import { BaseEntity } from '@core/entities'
import { User } from 'src/auth/users/entities/user.entity'
import { Meal } from 'src/meal/entities/meal.entity'
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm'

// Possíveis estados para o campo state
export enum OrderState {
  NEW = 'NEW',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum PaymentMethods {
  EMPTY = 'EMPTY',
  PIX = 'PIX',
  CREDIT_CARD = 'CREDIT_CARD',
}

@Entity()
export class Order extends BaseEntity {
  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  @JoinTable()
  public requester: User

  @Column({
    enum: ['NEW', 'PENDING', 'APPROVED', 'REJECTED'],
    default: OrderState.NEW, // Valor padrão é NEW que vai ser definido ao criar, não precisa ser mencionado no DTO de criação
  })
  public state: OrderState

  @ManyToOne(() => Meal, (meal) => meal.orders, { eager: true })
  @JoinTable()
  public meal: Meal

  @Column({
    type: 'decimal',
    default: 0,
  })
  public discount: number

  @Column({
    enum: ['EMPTY', 'PIX', 'CREDIT_CARD'],
    default: PaymentMethods.EMPTY,
  })
  public payment_method: PaymentMethods
}
