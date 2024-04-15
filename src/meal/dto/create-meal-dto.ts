import {
  IsString,
  IsInt,
  IsNotEmpty,
  MinLength,
  Min,
  IsNumber,
  IsDateString,
} from 'class-validator'

export class CreateMealDto {
  // Não é necessário colocar o meal_id pois é gerado automaticamente
  // e o mesmo não percorre pelo DTO.
  @IsDateString()
  @IsNotEmpty()
  public meal_date: Date

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public shift: string

  @IsNotEmpty()
  @Min(1)
  @IsNumber({ maxDecimalPlaces: 2 }) // Definindo a precisão para 2 casas decimais igual esta na entidade
  public price: number // Utilizando o number mesmo para representar os valores decimais

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  public availability: number
}
