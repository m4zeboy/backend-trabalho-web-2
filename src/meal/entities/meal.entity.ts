import { BaseEntity } from '@core/entities'
import { Feedback } from 'src/feedback/entities/feedback.entity'
import { Order } from 'src/orders/entities/order.entity'
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import { Food } from '../foods/entities/food.entity'

export enum MealShift {
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
}

@Entity()
export class Meal extends BaseEntity {
  @Column({ type: 'date' })
  public meal_date: Date

  @Column({
    enum: ['LUNCH', 'DINNER'],
    default: 'LUNCH',
  }) // Não é necessário colocar o type para string, o typeORM usa string como padrão.
  public shift: MealShift

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  public price: number

  @Column({
    type: 'int',
  })
  public availability: number

  @ManyToMany(() => Food, (food) => food.meals, { eager: true })
  @JoinTable()
  foods: Food[]

  @OneToMany(() => Order, (order) => order.meal)
  public orders: Order[]

  @OneToMany(() => Feedback, (feedback) => feedback.subject)
  public feedbacks: Feedback[]

  private getPurchaseWindow() {
    const PURCHASE_WINDOW = new Map<MealShift, Date[]>()

    const startLunchWindow = new Date()
    startLunchWindow.setHours(11, 0, 0)

    const endLunchWindow = new Date()
    endLunchWindow.setHours(13, 30, 0)

    const startDinnerWindow = new Date()
    startDinnerWindow.setHours(18, 0, 0)

    const endDinnerWindow = new Date()
    endDinnerWindow.setHours(23, 30, 0)

    PURCHASE_WINDOW.set(MealShift.LUNCH, [startLunchWindow, endLunchWindow])
    PURCHASE_WINDOW.set(MealShift.DINNER, [startDinnerWindow, endDinnerWindow])
    return PURCHASE_WINDOW
  }

  /* Função para verificar se a data atual está dentro da janela de compra -> usado para fazer o pedido */
  public isInPurchaseWindow() {
    const PURCHASE_WINDOW = this.getPurchaseWindow()
    const currentDate = new Date()
    const [startWindow, endWindow] = PURCHASE_WINDOW.get(this.shift)
    return currentDate >= startWindow && currentDate <= endWindow
  }
}
