import { IsEmail, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client'; // adjust path if needed

export class LoginDto {
  @ApiProperty({ example: 'jane@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securehashedpassword' })
  @IsString()
  password: string;
}

export class UserPayloadDto {
  @ApiProperty({ example: 'jane@example.com' })
  email: string;

  @ApiProperty({ enum: Role, example: Role.SUPER_ADMIN })
  @IsEnum(Role)
  role: Role;
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
