export declare class LoginDto {
    email: string;
    password: string;
}
export declare class UserPayloadDto {
    email: string;
    isAdmin: boolean;
}
export declare class LoginResponseDto {
    user: UserPayloadDto;
    access_token: string;
}
