import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Bcrypt } from 'src/shared/cryptography/bcrypt';
import { Jwt } from 'src/shared/cryptography/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthInputDto } from './dtos/auth-input/auth-input.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcrypt: Bcrypt,
    private readonly jwt: Jwt,
    private readonly userService: UsersService,
  ) {}

  public async login(data: AuthInputDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOneByEmail(data.email);

    const { password } = user;

    const passwordIsValid = await this.bcrypt.compare(data.password, password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    const accessToken = await this.jwt.encrypt(user);

    return {
      accessToken,
    };
  }
}
