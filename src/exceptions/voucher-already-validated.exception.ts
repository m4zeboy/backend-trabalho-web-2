import { HttpException, HttpStatus } from "@nestjs/common";

export class VoucherAlreadyValidated extends HttpException{
    constructor(){
        super('Voucher was Already Validated.', HttpStatus.CONFLICT)
    }
}