import { IsDecimal, IsString, IsDate, IsNumber } from "class-validator"
import { Decimal128 } from "typeorm"


export class CreateMealDto {

    @IsNumber()
    public meal_id: number 

    @IsDate()
    public meal_date: Date

    @IsString()
    public shift: string

    @IsDecimal({decimal_digits: '2'}) //Definindo a precisão para 2 casas decimais igual esta na entidade
    public price: number //Utilizando o number mesmo para representar os valores decimais

    @IsString()
    public availability: number

}