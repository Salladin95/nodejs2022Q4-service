import { IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(3, {
    message: 'Login is too short',
  })
  oldPassword: string; // previous password

  @IsString()
  @MinLength(3, {
    message: 'Login is too short',
  })
  newPassword: string; // new password
}
