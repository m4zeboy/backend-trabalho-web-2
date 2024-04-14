import { IsDateString, IsNotEmpty, IsNumber, Min } from 'class-validator'

// Definindo as regras de validação para os dados de entrada dos vouchers
export class CreateVoucherDto {

  // Não é necessário colocar o voucher_id pois é gerado automaticamente
  // e o mesmo não percorre pelo DTO.

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public order_id: number

  /* para criar não precisa do validated_at */

  @IsNotEmpty()
  @IsDateString()
  public expires_in: Date
}
