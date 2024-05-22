import { CurrentUser } from '@core/decorators'
import { RecordNotFoundException } from '@exceptions/record-not-found.exception'
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post
} from '@nestjs/common'
import { User } from 'src/auth/users/entities/user.entity'
import { VoucherService } from 'src/voucher/voucher.service'
import { CreateFeedbackRequestBody } from '../dto/post-feedback-request-body'
import { FeedbackService } from '../feedback.service'

@Controller('feedback/:voucher_id')
export class PostFeedbackController {
  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly voucherService: VoucherService
  ) {}

  @Post()
  async execute(@Body() { content }: CreateFeedbackRequestBody,  @CurrentUser() user: User, @Param('voucher_id') voucherId: number) {

    const voucher = await this.voucherService.findOneById(voucherId)
    if(!voucher) {
      throw new RecordNotFoundException()
    }
    if(!voucher.validated_at) {
      throw new HttpException("You can't post a feedback if you have not consumed your meal.", HttpStatus.FORBIDDEN)
    }

    const meal = voucher.order.meal

    return this.feedbackService.create({ 
      content,
      subject: meal,
      commented_by: user
    })
  }

  // @Get()
  // findAll(
  //   @Query('page') page: number = 1,
  //   @Query('commented_by') commented_by: number,
  // ) {
  //   return this.feedbackService.FindAll({ page, limit: 10 }, commented_by)
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.feedbackService.findOne(+id)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() UpdateFeebackDto: UpdateFeebackDto) {
  //   return this.feedbackService.update(+id, UpdateFeebackDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.feedbackService.remove(+id)
  // }
}
