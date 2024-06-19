import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateFeedbackRequestBody {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public content: string
}
