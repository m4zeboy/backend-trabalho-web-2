import { Controller, Patch, Param } from "@nestjs/common";
import { VoucherService } from "../voucher.service";
import { RecordNotFoundException } from "@exceptions/record-not-found.exception";
import { VoucherAlreadyValidated } from "@exceptions/voucher-already-validated.exception";
import { OrderPayment } from "src/payment/entities/order-payment.entity";
import { VoucherExpired } from "@exceptions/voucher-expired";
import { Order } from "src/orders/entities/order.entity";

@Controller('voucher')
export class ValidateVoucherController{
    constructor(
        private readonly voucherService: VoucherService,
    ){}

    @Patch(':id/validate') // Rota para validar voucher
    async validate(@Param('id') id: number){
        const voucher =  await this.voucherService.findOneById(id)

        const paymentDate: Date = voucher.paymentDate;
        const currentDate: Date = new Date(); 
        const expiresIn = new Date(paymentDate.getTime() + 4 * 60 * 60 * 1000);

        if(!voucher){
            throw new RecordNotFoundException()
        }

        if (currentDate > expiresIn) {
            throw new VoucherExpired()
        }
        
        if(voucher.validated_at !== null){
            throw new VoucherAlreadyValidated()
        }
        await this.voucherService.validateVoucher(id);

        return { message: 'Voucher Validated!'};
    }
}

