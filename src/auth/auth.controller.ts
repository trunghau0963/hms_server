import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Public } from "src/public.decorator";
import { ValidationPipe } from "src/validation.pipe";
import { AuthService } from "./auth.service";
import {
  LoginDtoByPhone,
  RefreshTokenDto,
  RegisterDto,
} from "./dtos/auth.dtos";
import { Auth } from "./entities/auth.entity";
import { AuthGuard } from "./guards/auth.guard";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("signup")
  @ApiBody({ type: RegisterDto })
  @ApiOperation({ summary: "Sign up User" })
  @ApiResponse({
    status: 200,
    description: "User successfully registered",
    type: RegisterDto,
  })
  @ApiResponse({
    status: 201,
    description: "User successfully registered and Response headers",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpDto: RegisterDto): Promise<User> {
    console.log("sign up");
    return await this.authService.signUp(signUpDto);
  }

  @Public()
  @Post("login")
  @ApiBody({ type: LoginDtoByPhone })
  @ApiOperation({ summary: "Sign in User" })
  @ApiResponse({
    status: 200,
    description: "User successfully logged in",
    type: Auth,
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Not Found" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body(new ValidationPipe()) signInDto: LoginDtoByPhone,
  ): Promise<any> {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  @ApiOperation({ summary: "Get profile User" })
  @ApiBearerAuth("JWT-auth")
  @ApiResponse({
    status: 200,
    description: "Get profile User",
    type: Auth,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Post("refresh")
  @ApiOperation({ summary: "Refresh token" })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: "Refresh token",
    type: Auth,
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<any> {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
