import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, ValidateIf } from 'class-validator';
import { UserType } from '../enum';

export class RegisterDto {
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @IsString()
    user_type: string;

    @ValidateIf((x: RegisterDto) => x.user_type === UserType.DRIVER)
    @IsNotEmpty()
    @IsString()
    vehicle_make?: string;

    @ValidateIf((x: RegisterDto) => x.user_type === UserType.DRIVER)
    @IsNotEmpty()
    @IsString()
    vehicle_model?: string;

    @ValidateIf((x: RegisterDto) => x.user_type === UserType.DRIVER)
    @IsNotEmpty()
    @IsString()
    license_plate?: string;
}

export class LoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
