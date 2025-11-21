import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly name?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  readonly email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(256)
  readonly password?: string;
}
