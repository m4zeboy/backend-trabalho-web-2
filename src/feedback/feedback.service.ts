import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback-dto';
import { UpdateFeebackDto } from './dto/update-feeddback-dto';
import { Feedback } from './entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Equal, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';


@Injectable()
export class FeedbackService {
    constructor(@InjectRepository(Feedback) private readonly repository: Repository<Feedback>) {}

    async create(createFeedbackDto: CreateFeedbackDto) {
      const feedback = new Feedback();
      feedback.content = createFeedbackDto.content;
      feedback.created_at = createFeedbackDto.created_at;
      feedback.commented_by = createFeedbackDto.commented_by;
  
      return this.repository.save(feedback); 
    }
  
    async FindAll(options: IPaginationOptions, commented_by?: number) {
      const where: FindOptionsWhere<Feedback> = {};
      if (commented_by) {
        where.commented_by = Equal(commented_by);
      }
      return paginate(this.repository, options, { where }); 
    }

    findOne(id: number) {
        return `This action returns a #${id} feedback`
      }
    
      update(id: number, UpdateFeebackDto: UpdateFeebackDto) {
        return `This action updates a #${id} feedback`
      }
    
      remove(id: number) {
        return `This action removes a #${id} feedback`
      }
}
