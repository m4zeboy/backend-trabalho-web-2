import { Controller, Patch, Param } from "@nestjs/common";
import { VoucherService } from "../voucher.service";
import { RecordNotFoundException } from "@exceptions/record-not-found.exception";
import { VoucherAlreadyValidated } from "@exceptions/voucher-already-validated.exception";

@Controller('voucher')
export class ValidateVoucherController{
    constructor(
        private readonly voucherService: VoucherService,
    ){}

    @Patch(':id/validate') // Rota para validar voucher
    async validate(@Param('id') id: number){
        const voucher =  await this.voucherService.findOneById(id)
        if(!voucher){
            throw new RecordNotFoundException()
        }

        if(voucher.validated_at !== null){
            throw new VoucherAlreadyValidated()
        }
        await this.voucherService.validateVoucher(id);

        return { message: 'Voucher Validated!'};
    }
}

