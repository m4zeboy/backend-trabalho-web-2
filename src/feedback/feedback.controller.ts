import { 
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
 } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback-dto';
import { UpdateFeebackDto } from './dto/update-feeddback-dto';

@Controller('feedback')
export class FeedbackController {
    constructor (private readonly feedbackService: FeedbackService){}
    
    @Post()
    create(@Body() CreateFeedbackDto: CreateFeedbackDto){
        return this.feedbackService.create(CreateFeedbackDto)
    }

    @Get()
    findAll(
        @Query('page') page: number = 1,
        @Query('commented_by') commented_by: number,
    ) {
        return this.feedbackService.FindAll({ page, limit: 10}, commented_by)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.feedbackService.findOne(+id)
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() UpdateFeebackDto: UpdateFeebackDto) {
      return this.feedbackService.update(+id, UpdateFeebackDto)
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.feedbackService.remove(+id)
    }
}
