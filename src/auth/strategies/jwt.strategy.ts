import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'test',
    });
  }

  async validate(payload: { email: string }) {
    const data = { email: payload.email };
    console.log(data);
    

    const user = await this.userService.findByCond(data);

    if (!user) {
      throw new UnauthorizedException('У вас нет доступа к этой странице');
    }

    return {
      id: user.id,
      email: user.email,
    };
  }
}
