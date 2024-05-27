import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Min, MinLength } from 'class-validator'

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public name: string

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  public portion: number

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  public calories: number

  @IsString()
  @IsUrl()
  @IsOptional()
  public imageUrl: string

}
