import { MealShift } from 'src/meal/entities/meal.entity'

export function purchaseWindowFactory() {
  const PURCHASE_WINDOW = new Map<MealShift, Date[]>()

  const startLunchWindow = new Date()
  startLunchWindow.setHours(11, 0, 0)

  const endLunchWindow = new Date()
  endLunchWindow.setHours(13, 30, 0)

  const startDinnerWindow = new Date()
  startDinnerWindow.setHours(18, 0, 0)

  const endDinnerWindow = new Date()
  endDinnerWindow.setHours(20, 30, 0)

  PURCHASE_WINDOW.set(MealShift.LUNCH, [startLunchWindow, endLunchWindow])
  PURCHASE_WINDOW.set(MealShift.DINNER, [startDinnerWindow, endDinnerWindow])

  return PURCHASE_WINDOW
}
