import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ErrorResponseObject, SuccessResponseObject } from '@/shared/response.shared';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const response = await this.authService.register(registerDto);
      return new SuccessResponseObject(
        'User created successfully',
        response,
      );
    } catch (error) {
      ErrorResponseObject(error, 'Error signing up');
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {

    try {
      const response = await this.authService.login(loginDto);

      res.cookie('auth_token', response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      });
      console.log('here');
      return res.status(200).json({
        message: 'Logged in successfully',
        user: response.user,
        token: response.token,
      })
    } catch (error) {
      ErrorResponseObject(error, 'Error logging in');
    }
  }

  @Post('logout')
  async logout(@Res() res: Response) {
      res.clearCookie('auth_token');
      res.json({ message: 'Logged out successfully' });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
