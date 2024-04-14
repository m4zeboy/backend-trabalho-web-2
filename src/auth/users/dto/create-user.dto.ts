import {
  IsEmail,
  IsEnum,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator'
import { UserRole } from '../types/user-role.enum'

export class CreateUserDto {
  @IsString()
  public name: string

  @IsString()
  @Length(11)
  public cpf: string

  @IsString()
  @IsEmail()
  public email: string

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  public password: string

  @IsEnum(UserRole)
  public role: UserRole
}
