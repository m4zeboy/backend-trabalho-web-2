import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VoucherModule } from 'src/voucher/voucher.module'
import { ListMealFeedbacksController } from './controllers/list-meal-feedbacks.controller'
import { PostFeedbackController } from './controllers/post-feedback.controller'
import { Feedback } from './entities/feedback.entity'
import { FeedbackService } from './feedback.service'

@Module({
  imports: [TypeOrmModule.forFeature([Feedback]), VoucherModule],
  providers: [FeedbackService],
  controllers: [PostFeedbackController, ListMealFeedbacksController],
})
export class FeedbackModule {}
