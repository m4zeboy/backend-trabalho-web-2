import { CurrentUser } from '@core/decorators'
import { randomBoolean } from '@core/utils/random-boolean'
import { MealIsNotAvailableException } from '@exceptions/meal-is-not-available.exception'
import { PurchaseWindowIsClosedException } from '@exceptions/purchase-window-is-closed.exception'
import { RecordNotFoundException } from '@exceptions/record-not-found.exception'
import { Body, Controller, Post } from '@nestjs/common'
import { User } from 'src/auth/users/entities/user.entity'
import { MealService } from 'src/meal/meal.service'
import { CreateOrderRequestBody } from '../dto/create-order-request-body'
import { OrdersService } from '../orders.service'

@Controller('orders')
export class PlaceOrderController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly mealsService: MealService,
  ) {}

  @Post()
  async execute(
    @Body() body: CreateOrderRequestBody,
    @CurrentUser() requester: User,
  ) {
    try {

    const doesMealExists = await this.mealsService.findOne(body.meal.id)
    if (!doesMealExists) {
      throw new RecordNotFoundException()
    }

    /* Verifica se a data que o usuário está fazendo o pedido é a mesma data da refeição. RN-11 */
    const isCurrentDateTheSameAsMealDate =
      this.mealsService.isCurrentDateTheSameAsMealDate(doesMealExists.meal_date)

    if (!isCurrentDateTheSameAsMealDate) {
      throw new MealIsNotAvailableException()
    }
    /* verifica se está na janela de venda. RN-03 */
    const meal = doesMealExists
    if (!meal.isInPurchaseWindow()) {
      throw new PurchaseWindowIsClosedException()
    }
    const { availability } = doesMealExists

    /* verifica se a refeição está disponível. RN-10 */
    if (availability < 1) {
      throw new MealIsNotAvailableException()
    }

    /* VERIFICA COM RANDOM BOOLEAN SE O USUARIO TERA O DESCONTO OU NÃO */ 
  
    const verifyDisponibilityDiscount = randomBoolean()
    let discount = 0; /* DECLARANDO A VARIAVEL COM LET POIS NÃO É UM VALOR CONSTANTE */
    if(verifyDisponibilityDiscount){
      discount = 10; /* REATRIBUINDO O VALOR DE DESCONTO CASO O VALOR DE VDD SEJA TRUE */
    }

    const dto = { ...body, requester, discount } 
    return await this.ordersService.create(dto)
  } catch(error) {
    console.log(error)
    throw error
  }

  }
}
