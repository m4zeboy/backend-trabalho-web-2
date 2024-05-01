import { IsDate, IsNumber, IsString, IsNotEmpty } from 'class-validator'

export class CreateCCDto {
  @IsString()
  @IsNotEmpty()
  public card_number: string

  @IsDate()
  @IsNotEmpty()
  public expiration_date: Date

  @IsNumber()
  @IsNotEmpty()
  public security_code: number

  @IsString()
  @IsNotEmpty()
  public account_holder: string
}
