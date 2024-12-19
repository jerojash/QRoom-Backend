import { IsEmail, IsString, MinLength } from 'class-validator';

export class SendEmailDto {
  @IsString()
  @MinLength(1)
  @IsEmail()
  email: string;
}
