import { Controller, Get, Query, Param, Post, Body, Delete } from '@nestjs/common'
import { CreateVoucherDto } from './dto/create-voucher.dto'
import { Voucher } from './entities/voucher.entity'
import { VoucherService } from './voucher.service'
import { Pagination } from 'nestjs-typeorm-paginate'

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
    @Query('user_id') user_id: number,
    @Query('order_by') order_by: keyof typeof Voucher,
    @Query('order_by_direction') order_by_direction: 'ASC' | 'DESC',
  ) {
    return this.voucherService.findAll(
      { page, limit: 10 },
      { user_id, order_by, order_by_direction },
    )
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.voucherService.findOne(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.voucherService.remove(+id)
  }

  @Get('report/by-date')
  async getVouchersByDate(
    @Query('date') date: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<Pagination<Voucher>> {
    if (!date) {
      throw new Error('Date query parameter is required')
    }
    return this.voucherService.findVouchersByDate(date, { page, limit })
  }
}
