import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthInputDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
