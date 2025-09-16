import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });

    if (!config.get<string>('JWT_SECRET')) {
      this.logger.error('JWT_SECRET is not configured');
    }
  }

  async validate(payload: { username: string }) {
    if (!payload?.username) {
      this.logger.warn('JWT payload missing username');
      throw new UnauthorizedException('Invalid token payload');
    }
    return { username: payload.username };
  }
}
