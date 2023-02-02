import { IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(3, {
    message: 'Login is too short',
  })
  oldPassword: string;

  @IsString()
  @MinLength(3, {
    message: 'Login is too short',
  })
  newPassword: string;
}
