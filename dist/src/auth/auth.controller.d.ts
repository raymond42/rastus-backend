import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<LoginResponseDto>;
}
