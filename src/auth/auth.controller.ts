import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    type: LoginResponseDto,
    description: 'User logged in successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(loginDto);
  }
}
