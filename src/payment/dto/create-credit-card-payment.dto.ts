import { Type } from 'class-transformer'
import {
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
  public card_number: string

  @IsDateString()
  @IsNotEmpty()
  public expiration_date: Date

  @IsNumber()
  @IsNotEmpty()
  public security_code: number

  @IsString()
  @IsNotEmpty()
  public account_holder: string
}
