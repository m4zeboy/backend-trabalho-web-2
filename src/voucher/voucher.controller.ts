
import { Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
 } from '@nestjs/common'
import { VoucherService } from './voucher.service'
import { Voucher } from './entities/voucher.entity'
import { CreateVoucherDto } from './dto/create-voucher.dto'

@Controller('voucher')
export class VoucherController {
    constructor(private readonly VoucherService: VoucherService) {}

    @Post()
    create(@Body() CreateVoucherDto: CreateVoucherDto){
        return this.VoucherService.create(CreateVoucherDto)
    }

    //estou com duvida
    /*@Get()
    findAll (
    @Query('page') page: number = 1, 
    @Query('id') voucher_id: number,
    @Query('order_id') order_id: number,
    ) {
        return this.VoucherService.findAll({ page, limit: 10}, voucher_id, order_id)
    }*/

    @Get(':id')
    findOne(@Param('id') id: number){
        return this.VoucherService.findOne(+id)
    }

    //estou com duvida
    /*@Patch(':id')
    update(@Param('id') id: number, @Body())*/

    @Delete(':id')
    remove(@Param('id') id: number){
        return this.VoucherService.remove(+id)
    }

}
