import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserResponseType } from 'src/users/types/user/user.response.type';
import { UsersService } from 'src/users/users.service';

type AuthPayloadType = {
  id: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(JwtStrategy.name);
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate(
    authPayload: AuthPayloadType,
  ): Promise<UserResponseType> {
    this.logger.log(JSON.stringify(authPayload));

    const user = await this.userService.findOneById(authPayload.id);

    const validUser = async (): Promise<boolean> => user.id === authPayload.id;

    if (!user && validUser()) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
