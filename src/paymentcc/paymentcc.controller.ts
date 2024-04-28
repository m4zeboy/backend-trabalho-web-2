import { Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
 } from '@nestjs/common';
import { PaymentccService  } from './paymentcc.service';
import { CreateCCDto } from './dto/create-cc-dto';
import { UpdateCCDto } from './dto/update-cc-dto';


@Controller('paymentcc')
export class PaymentccController {
    constructor (private readonly PaymentccService: PaymentccService){}

    @Post()
    create(@Body() CreateCCDto: CreateCCDto){
        return this.PaymentccService.create(CreateCCDto)
    }

    @Get()
    findAll(
        @Query('page') page: number = 1,
        @Query('card_number') card_number: string,
    ) {
        return this.PaymentccService.FindAll({page, limit: 10}, card_number)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.PaymentccService.findOne(+id)
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() UpdateCCDto: UpdateCCDto) {
      return this.PaymentccService.update(+id, UpdateCCDto)
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.PaymentccService.remove(+id)
    }
}
