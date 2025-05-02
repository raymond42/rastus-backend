import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UserPayloadDto {
  @ApiProperty({ example: 'Eusebio_Rutherford56@hotmail.com' })
  email: string;

  @ApiProperty({ example: true })
  isAdmin: boolean;
}

export class LoginResponseDto {
  @ApiProperty({ type: UserPayloadDto })
  user: UserPayloadDto;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  access_token: string;
}
