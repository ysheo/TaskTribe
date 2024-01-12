import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userid: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
