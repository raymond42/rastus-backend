import {
  isBoolean,
  IsBoolean,
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  @IsString()
  password: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsString()
  imageUrl: string;

  @IsBoolean()
  isAdmin: boolean;

  @IsBoolean()
  isVerified: boolean;

  @IsBoolean()
  isBlocked: boolean;

  @IsBoolean()
  isActive: boolean;
}
