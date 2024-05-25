import { Controller, Patch, Param, UseGuards } from '@nestjs/common'
import { VoucherService } from '../voucher.service'
import { RecordNotFoundException } from '@exceptions/record-not-found.exception'
import { VoucherAlreadyValidated } from '@exceptions/voucher-already-validated.exception'
import { VoucherExpired } from '@exceptions/voucher-expired'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { RequiresRole } from '@core/decorators/requires-role.decorator'
import { UserRole } from 'src/auth/users/types/user-role.enum'

@Controller('voucher')
export class ValidateVoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Patch(':id/validate') // Rota para validar voucher
  @RequiresRole(UserRole.ADMIN)
  @UseGuards(RolesGuard) // Chamando o guardinha piuiuiuiuiui
  async validate(@Param('id') id: number) {
    const voucher = await this.voucherService.findOneById(id)

    const currentDate: Date = new Date()
    const expiresIn = voucher.expires_in

    if (!voucher) {
      throw new RecordNotFoundException()
    }

    if (currentDate > expiresIn) {
      throw new VoucherExpired()
    }

    if (voucher.validated_at !== null) {
      throw new VoucherAlreadyValidated()
    }
    await this.voucherService.validateVoucher(id)

    return { message: 'Voucher Validated!' }
  }
}
