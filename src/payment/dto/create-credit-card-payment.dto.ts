import { Type } from 'class-transformer'
import {
  IsCreditCard,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator'
import { Order } from 'src/orders/entities/order.entity'

export class CreateCreditCardPaymentDto {
  @ValidateNested()
  @Type(() => Order)
  public order: Order

  @IsString()
  @IsNotEmpty()
  @IsCreditCard() // O algoritmo de Luhn ou fórmula de Luhn, também conhecido como algoritmo "módulo 10" ou "mod 10", em homenagem ao seu criador,
  // o cientista da IBM Hans Peter Luhn, é uma fórmula de dígito de verificação simples usada para validar uma variedade de números de identificação.
  public card_number: string

  @IsDateString()
  @IsNotEmpty()
  public expiration_date: Date

  @IsNumber()
  @IsNotEmpty()
  // @IsCreditCard()
  public security_code: number

  @IsString()
  @IsNotEmpty()
  public account_holder: string
}
