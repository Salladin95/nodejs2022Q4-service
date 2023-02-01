import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, {
    message: 'Login is too short',
  })
  login: string;

  @IsString()
  @MinLength(5, {
    message: 'Password is too short',
  })
  password: string;
}
