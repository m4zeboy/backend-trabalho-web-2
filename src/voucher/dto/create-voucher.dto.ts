import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator'

// Definindo as regras de validação para os dados de entrada dos vouchers
export class CreateVoucherDto {
  @IsNotEmpty()
  @IsNumber()
  public order_id: number

  /* para criar não precisa do validated_at */

  @IsNotEmpty()
  @IsDateString()
  public expires_in: Date
}
