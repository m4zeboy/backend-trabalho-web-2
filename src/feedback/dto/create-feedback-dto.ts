import {
  IsDate,
  IsNumber,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator'

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public content: string

  @IsDate()
  @IsNotEmpty()
  public created_at: Date

  @IsNumber()
  @IsNotEmpty()
  @MinLength(3)
  public commented_by: number
}
