import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import {
  ApiBody, ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard as AuthGuardPassport } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SetMetadata } from '@nestjs/common';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
import { User } from '@prisma/client';
import { loginDtoByPhone, registerDto } from './dtos/auth.dtos';
import { ValidationPipe } from 'src/validation.pipe';
import { Auth } from './entities/auth.entity';


@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpDto: registerDto): Promise<User> {
    console.log('sign up')
    try {
      return await this.authService.signUp(signUpDto);
    } catch (error) {
      console.error('Error during sign-up:', error);
      throw new HttpException({ message: 'Sign-up failed', error }, 400);
    }
  }

  @Public()
  @ApiBody({ type: loginDtoByPhone })
  @Post('login')
  @ApiOperation({ summary: 'Sign in User' })
  @HttpCode(HttpStatus.OK)
  async signIn(@Body(new ValidationPipe) signInDto: loginDtoByPhone): Promise<any> {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuardPassport('jwt'))
  @Post('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get()
  findAll() {
    return [];
  }

  @Public()
  @Get('role')
  async getRole(token: string): Promise<string> {
    return this.authService.getRole(token);
  }
}