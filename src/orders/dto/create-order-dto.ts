import { IsDate, IsDecimal, IsInt, IsNotEmpty, IsString, MinLength, IsNumber } from "class-validator";

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    public requester: string

    @IsDate()
    @IsNotEmpty()
    public requested_at: Date

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    public state: string

    @IsInt() //Confirmar se é necessário chamar o meal_id, esqueci :(
    @IsNotEmpty()
    public meal_id: number

    @IsDecimal()
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    public total_price: number
}