import { BaseEntity } from '@core/entities'
import { User } from 'src/auth/users/entities/user.entity'
import { Meal } from 'src/meal/entities/meal.entity'
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm'

@Entity()
export class Feedback extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  public content: string

  @ManyToOne(() => User, (user) => user.feedbacks, { eager: true })
  @JoinTable()
  public commented_by: User

  @ManyToOne(() => Meal, (meal) => meal.feedbacks)
  public subject: Meal
}
