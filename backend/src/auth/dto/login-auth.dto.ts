import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  userEmail: string;

  @IsString()
  @MinLength(8)
  passwordProvided: string;
}
