import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Patch,
} from '@nestjs/common'
import { CreateVoucherDto } from './dto/create-voucher.dto'
import { VoucherService } from './voucher.service'

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  create(@Body() createVoucherDto: CreateVoucherDto) {
    return this.voucherService.create(createVoucherDto)
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('order_id') order_id: number,
  ) {
    return this.voucherService.findAll({ page, limit: 10 }, order_id)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.voucherService.findOne(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.voucherService.remove(+id)
  }
}
