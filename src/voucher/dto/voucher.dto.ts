import { IsNotEmpty, IsNumber} from "class-validator"

//Definindo as regras de validação para os dados de entrada dos vouchers
export class VoucherDto {

    @IsNotEmpty()
    @IsNumber()
    public voucher_id: number

    @IsNotEmpty()
    @IsNumber()
    public order_id: number 

    @IsNotEmpty()
    public validated_at: Date /* ver se nao vai ser string */

    @IsNotEmpty()
    public expires_in: Date

}