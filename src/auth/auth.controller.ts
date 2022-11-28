import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInputDto } from './dtos/auth-input/auth-input.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  public async signIn(
    @Body() authInputDto: AuthInputDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.login(authInputDto);
  }
}
